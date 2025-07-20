# 参数配置面板

这是一个基于Vue3和Element Plus的参数配置面板组件，支持对象类型参数的树状结构配置。

## 功能特点

- 支持多种参数类型：string、number、boolean、object、array
- 当参数类型为object时，可以通过配置子项来实现赋值
- 子项可以无限嵌套，形成树状结构
- 实时预览生成的对象值
- 响应式设计，操作便捷

## 效果预览

当参数类型为object时，参数值输入框会被禁用，需要通过添加和配置子项来构建对象值：

1. 主面板可以设置参数类型、参数名称
2. 选择object类型后，会出现子参数配置区域
3. 可以添加多个子参数，每个子参数都有自己的类型、名称和值
4. 子参数也可以设置为object类型，形成嵌套结构
5. 面板底部会实时显示构建的对象值预览

## 安装与运行

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 使用方法

在你的Vue组件中引入Panel组件：

```vue
<template>
  <div>
    <Panel />
  </div>
</template>

<script setup>
import Panel from './Panel.vue';
</script>
```

## 技术栈

- Vue 3 (使用Composition API和setup语法糖)
- Element Plus 组件库
- Vite 构建工具