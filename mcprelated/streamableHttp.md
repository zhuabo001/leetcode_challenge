### 关于 Streamable http 你可以了解到的事

周五快下班的时候，组里的后端佬抛出了一个问题，问我 streamable http 是否支持双向通信。我当时就很纳闷，你都这个水平了，http 是单向的，加个前缀就不是单向的了？俗话说的好啊，越无知越笃定。另一个后端佬甩出了 csdn 一篇帖子，里面赫然写着：“streamable http 是支持双向通信的”。我当时就很震惊，“吹牛逼”，我当时就很疑惑，这是怎么回事？

#### streamable http 有什么用

##### 旧 mcp 协议中的 http + sse

mcp，全称是 model context protocol，其是构建复杂任务 agent 的基础，但是这并不是本文的重点内容，在这里提到是为了引出本文的主角 streamable http。在过去，mcp 主要采用传统 http + sse 的形式，但是这种形式有一些缺点，比如：每次都需要维护两个独立的端点（http 方法 + http 请求 url）， 例如：
端点 1: POST /messages，用于发送请求获取 mcp 可以调用的工具列表

````plaintext
POST /messages
Content-Type: application/json

{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "id": 1
}

```plaintext
GET /mcp
Accept: text/event-stream
Cache-Control: no-cache

# 服务器响应：
data: {"jsonrpc":"2.0","method":"notifications/progress","params":{...}}

data: {"jsonrpc":"2.0","method":"notifications/message","params":{...}}
````

sse 则是需要客户端和服务端之间保持一个持久的链接，单向（服务端向客户端）流式传输，此时服务器的负担就会很重。
双端架构（简化）如下：

```plaintext
客户端                    服务器
   │                        │
   ├─ POST /messages ──────→│  (请求端点)
   │                        │
   ├─ GET /mcp ←──────────── │  (SSE推送端点)
   │  (保持连接)              │
```

从上面的结构图，所以从广义上来说，这种模式也是一种双向通信(伪双向)。但同时我们也可以推断出双端结构的一些弊端：

- 需要管理两个不同的链接
- 服务器需要实现两套不同的逻辑
- 客户端需要协调两个端点的状态
- 为部署带来复杂挑战
- 负载均衡更复杂

##### streamable http 带来的变革

最大的变革，即统一的 post 端点

```plaintext
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream

{
  "jsonrpc": "2.0",
  "method": "tools/list",
  "id": 1
}
```

在 Accept 字段中我们可以看到，服务器可以自由选择两种不同的响应格式，一种是 json，一种是 event-stream。
讲到这里，我想应该不少朋友还是处于懵懵的状态，这里附上一个简单的 demo，帮助大家理解。

场景为客户端请求工具列表，服务器需要发送进度通知。老式的双端架构代码大致如下：

```javascript
// 客户端代码
class OldMCPClient {
  constructor(baseUrl) {
    this.requestUrl = `${baseUrl}/messages`;
    this.sseUrl = `${baseUrl}/mcp`;
  }

  async initialize() {
    // 1. 建立SSE连接用于接收推送
    this.eventSource = new EventSource(this.sseUrl);
    this.eventSource.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      this.handleNotification(notification);
    };

    // 2. 发送初始化请求
    const response = await fetch(this.requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'initialize',
        id: 1,
      }),
    });
  }

  async listTools() {
    // 只能通过POST端点发送请求
    return fetch(this.requestUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'tools/list',
        id: 2,
      }),
    });
  }
}
```

而新式的单一端点结构如下：

```javascript
// 客户端代码
class NewMCPClient {
  constructor(baseUrl) {
    this.endpointUrl = `${baseUrl}/mcp`; // 只需要一个端点
  }

  async makeRequest(method, params = {}) {
    const response = await fetch(this.endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/event-stream', // 支持两种响应
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method,
        params,
        id: Date.now(),
      }),
    });

    // 根据响应类型处理
    if (response.headers.get('content-type')?.includes('text/event-stream')) {
      return this.handleStreamResponse(response);
    } else {
      return response.json();
    }
  }

  async handleStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          this.handleMessage(data);
        }
      }
    }
  }
}
```

从上面的代码可以看出，新的架构下，客户端只需要维护一个端点，而服务器只需要实现一个端点即可。
简化的服务端（nodejs）代码：

```javascript
// 老式：需要两个路由处理器
app.post('/messages', handleRequest);
app.get('/mcp', handleSSE);

// 新式：只需要一个路由处理器
app.post('/mcp', (req, res) => {
  const request = req.body;

  if (needsStreaming(request)) {
    // 返回流式响应
    res.setHeader('Content-Type', 'text/event-stream');
    streamResponse(res, request);
  } else {
    // 返回标准JSON响应
    res.json(processRequest(request));
  }
});
```

新的单一端点架构同时带来了更简单的负载均衡（以 nginx file 为例）

```plaintext
# 老式：需要配置两个不同的路径
location /messages {
    proxy_pass http://backend;
}
location /mcp {
    proxy_pass http://backend;
    proxy_set_header Connection '';
    proxy_http_version 1.1;
    proxy_buffering off;
}

# 新式：只需要一个配置
location /mcp {
    proxy_pass http://backend;
}
```

所以让我们总结一下 streamable http 带来的提升：

1. 一个 URL 路径 ： POST /mcp
2. 一套处理逻辑 ：根据请求内容和需求决定响应方式
3. 灵活的响应 ：可以是 JSON 也可以是流式数据
4. 简化的架构 ：减少了系统复杂性和维护成本

#### streamable http 和真正的全双工通信 websocket 的区别

上面我们使用了大量的例子来具体说明 streamable http 到底是什么(没办法，协议是相对抽象的，我们只能以有形的 demo 去攻略无形的知识点)，但还是没能彻底解决我的困惑，即 streamable http 和真正的全双工通信 websocket 的区别（主要是判断 streamable http 是否是全双工）。
先抛出结论： streamable 的双向通信是伪双向，体现在“请求时双向，请求间单向”。
来，先展示下“伪双向”的时序图

```plaintext
客户端                           服务器
   │                               │
   ├─ POST /mcp (代码执行请求) ────→│
   │                               ├─ 开始执行
   │                               │
   │←── data: 进度 10% ─────────────┤
   │←── data: 进度 30% ─────────────┤
   │←── data: 输出 "Hello" ─────────┤
   │←── data: 进度 60% ─────────────┤
   │←── data: 输出 "World" ─────────┤
   │←── data: 完成 ─────────────────┤
   │                               │
   ├─ POST /mcp (新请求) ──────────→│  // 必须新建连接
   │                               │
```

我们再来看看 websocket 这个真双向的时序图

```plaintext
客户端                           服务器
   │                               │
   ├─ 建立 WebSocket 连接 ─────────→│
   │←─────────────── 连接确认 ──────┤
   │                               │
   ├─ 代码执行请求 ────────────────→│
   │←── 进度 10% ──────────────────┤
   ├─ 取消请求 ───────────────────→│  // 可以随时发送
   │←── 取消确认 ──────────────────┤
   │←── 执行停止 ──────────────────┤
   │                               │
   ├─ 新的执行请求 ────────────────→│  // 同一连接
   │←── 进度 20% ──────────────────┤
   │←── 输出 "Hello" ──────────────┤
   ├─ 状态查询 ───────────────────→│  // 可以并发发送
   │←── 状态响应 ──────────────────┤
   │←── 进度 50% ──────────────────┤

```

用一个不太恰当的例子来解释就是，真正的全双工通信是一条“双向多车道”， 而“伪双向”通信是两条“单向多车道”。
我们再来看看两者在客户端和服务端实现上分别有什么不同。
首先是“伪双向”的客户端实现：

```javascript
class StreamableHTTPClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
  }

  // 上行通道：发送请求
  async executeCode(code) {
    const response = await fetch(`${this.serverUrl}/mcp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream', // 期望流式响应
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        method: 'code/execute',
        params: { code },
        id: Date.now(),
      }),
    });

    // 下行通道：接收流式响应
    return this.handleStreamResponse(response);
  }

  async handleStreamResponse(response) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      const lines = chunk.split('\n');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = JSON.parse(line.slice(6));
          this.handleMessage(data);
        }
      }
    }
  }

  handleMessage(message) {
    switch (message.method) {
      case 'execution/progress':
        console.log(`进度: ${message.params.percentage}%`);
        break;
      case 'execution/output':
        console.log(`输出: ${message.params.output}`);
        break;
      case 'execution/complete':
        console.log('执行完成');
        break;
    }
  }

  // 如果需要发送更多请求，必须创建新的连接
  async sendAnotherRequest(data) {
    // 这是一个完全独立的请求
    return fetch(`${this.serverUrl}/mcp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  }
}
```

服务端实现：

```javascript
app.post('/mcp', (req, res) => {
  const request = req.body;

  if (request.method === 'code/execute') {
    // 设置流式响应
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // 模拟代码执行过程
    executeCodeWithProgress(
      request.params.code,
      (progress) => {
        // 发送进度更新
        res.write(
          `data: ${JSON.stringify({
            jsonrpc: '2.0',
            method: 'execution/progress',
            params: { percentage: progress },
          })}\n\n`
        );
      },
      (output) => {
        // 发送输出
        res.write(
          `data: ${JSON.stringify({
            jsonrpc: '2.0',
            method: 'execution/output',
            params: { output },
          })}\n\n`
        );
      },
      () => {
        // 执行完成
        res.write(
          `data: ${JSON.stringify({
            jsonrpc: '2.0',
            method: 'execution/complete',
            params: {},
          })}\n\n`
        );
        res.end();
      }
    );
  }
});
```

“伪双向”的特点之一就是当我们需要发送更多请求，必须创建新的链接，并且，实际上我们没法通过请求 b 去干涉请求 a 的决策和执行。

然后我们看看“真双向”的客户端实现

```javascript
class WebSocketClient {
  constructor(serverUrl) {
    this.ws = new WebSocket(serverUrl);
    this.setupEventHandlers();
  }

  setupEventHandlers() {
    this.ws.onopen = () => {
      console.log('连接建立');
    };

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.handleMessage(message);
    };
  }

  // 可以随时发送请求
  executeCode(code) {
    this.ws.send(
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'code/execute',
        params: { code },
        id: Date.now(),
      })
    );
  }

  // 可以随时发送其他请求，无需新建连接
  cancelExecution() {
    this.ws.send(
      JSON.stringify({
        jsonrpc: '2.0',
        method: 'execution/cancel',
        id: Date.now(),
      })
    );
  }

  // 可以同时发送多个请求
  sendMultipleRequests() {
    this.executeCode('console.log("task1")');
    this.executeCode('console.log("task2")');
    this.cancelExecution();
    // 所有请求都通过同一个连接发送
  }
}
```

这里我们可以清晰地看到，建立请求和事件处理的逻辑是解耦的，当建立连接的操作完成后，我们可以随时发送请求，而不需要等待响应；并且只需要建立一次连接。

服务端实现

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const request = JSON.parse(data);

    if (request.method === 'code/execute') {
      executeCodeWithProgress(
        request.params.code,
        (progress) => {
          // 随时发送进度
          ws.send(
            JSON.stringify({
              jsonrpc: '2.0',
              method: 'execution/progress',
              params: { percentage: progress },
            })
          );
        },
        (output) => {
          // 随时发送输出
          ws.send(
            JSON.stringify({
              jsonrpc: '2.0',
              method: 'execution/output',
              params: { output },
            })
          );
        }
      );
    } else if (request.method === 'execution/cancel') {
      // 可以立即处理取消请求
      cancelCurrentExecution();
      ws.send(
        JSON.stringify({
          jsonrpc: '2.0',
          result: 'cancelled',
          id: request.id,
        })
      );
    }
  });
});
```

真正的双向通信就是我可以通过请求 b 去干预请求 a 的执行，比如取消请求 a 的执行。
朋友们不用觉得 demo 的代码看上去很多，但其实结论还是比较简洁的，真伪双向的本质就是看请求间的隔离性，伪双向是完全隔离，无法互相影响的，而真双向是统一绘话，可以互相影响。

##### 设计哲学上的差异

Streamable HTTP：任务导向

- 设计理念 ：每个请求是一个独立的任务
- 适用场景 ：相对独立的操作，如文件上传、数据查询、报告生成
- 优势 ：简单、可靠、易于缓存和负载均衡
- 限制 ：无法实现复杂的交互控制
  WebSocket：会话导向
- 设计理念 ：整个连接是一个持续的会话
- 适用场景 ：需要复杂交互的应用，如游戏、协作工具、实时监控
- 优势 ：灵活的交互控制，真正的实时通信
- 限制 ：连接管理复杂，难以缓存
  所以看到这里，大家或许也就能理解 mcp 为什么采用 streamable http 而不是 websocket 了——因为 MCP 主要处理相对独立的工具调用和资源访问，而不需要复杂的跨操作控制。

#### 总结

本篇文章主要还是就 streamable http 的设计进行了介绍，并解释了为什么可以说它是一种“双向”的通信协议，以及介绍了它和 websocket 之间的区别，希望能帮助大家对“单双向”以及 streamable http 有一个更清晰的理解。
