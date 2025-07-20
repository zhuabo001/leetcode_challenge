<template>
  <div class="parameter-panel">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>参数配置</span>
        </div>
      </template>
      
      <!-- 根参数配置 -->
      <div class="root-parameter">
        <el-form :model="paramForm" label-width="100px">
          <el-row :gutter="20" class="param-row">
            <el-col :span="6">
              <el-form-item label="类型" label-width="50px">
                <el-select v-model="paramForm.type" placeholder="请选择参数类型" @change="handleTypeChange" style="width: 100%">
                  <el-option label="string" value="string" />
                  <el-option label="number" value="number" />
                  <el-option label="boolean" value="boolean" />
                  <el-option label="object" value="object" />
                  <el-option label="array" value="array" />
                </el-select>
              </el-form-item>
            </el-col>
            
            <el-col :span="6">
              <el-form-item label="名称" label-width="50px">
                <el-input v-model="paramForm.name" placeholder="请输入参数名称" />
              </el-form-item>
            </el-col>
            
            <el-col :span="8">
              <el-form-item label="值" label-width="30px" v-if="paramForm.type !== 'object'">
                <el-input v-model="paramForm.value" placeholder="请输入参数值" />
              </el-form-item>
            </el-col>
            
            <el-col :span="4" class="add-btn-col" v-if="paramForm.type === 'object'">
              <el-button type="primary" size="small" @click="addSubParam">添加子项</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      
      <!-- 使用Tree组件显示参数树 -->
      <div v-if="paramForm.type === 'object' && subParams.length > 0" class="parameter-tree">
        <el-tree
          :data="subParams"
          node-key="id"
          default-expand-all
          :expand-on-click-node="false"
          draggable
          :allow-drop="allowDrop"
          :props="{
            label: 'name',
            children: 'children'
          }"
        >
          <template #default="{ node, data }">
            <div class="custom-tree-node">
              <div class="parameter-row">
                <div class="parameter-title">
                  <span class="param-type-badge">{{ data.type }}</span>
                  <span class="param-name">{{ data.name || '(未命名)' }}</span>
                  <el-input 
                    v-if="data.type !== 'object'" 
                    v-model="data.value" 
                    placeholder="请输入值" 
                    class="inline-value-input" 
                    @change="handleNodeDataChange(node, data)"
                  />
                  <el-button 
                    v-if="data.type === 'object'" 
                    type="primary" 
                    size="small" 
                    @click="addChildParam(node, data)" 
                    class="inline-add-btn"
                  >添加子项</el-button>
                </div>
                <div class="node-actions">
                  <el-button 
                    type="primary" 
                    size="small" 
                    @click="editNodeParam(node, data)"
                  >编辑</el-button>
                  <el-button 
                    type="danger" 
                    size="small" 
                    @click="removeNodeParam(node, data)"
                  >删除</el-button>
                </div>
              </div>
            </div>
          </template>
        </el-tree>
      </div>
      
      <!-- 显示最终的对象值 -->
      <div v-if="paramForm.type === 'object'" class="result-preview">
        <h4>对象值预览：</h4>
        <pre>{{ objectValuePreview }}</pre>
      </div>
    </el-card>
    
    <!-- 添加参数编辑对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑参数"
      width="50%"
      :close-on-click-modal="false"
    >
      <el-form :model="tempEditParam" label-width="80px">
        <el-form-item label="类型">
          <el-select v-model="tempEditParam.type" placeholder="请选择类型" style="width: 100%">
            <el-option label="string" value="string" />
            <el-option label="number" value="number" />
            <el-option label="boolean" value="boolean" />
            <el-option label="object" value="object" />
            <el-option label="array" value="array" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="名称">
          <el-input v-model="tempEditParam.name" placeholder="请输入参数名称" />
        </el-form-item>
        
        <el-form-item label="值" v-if="tempEditParam.type !== 'object'">
          <el-input v-model="tempEditParam.value" placeholder="请输入参数值" />
        </el-form-item>
      </el-form>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEditParam">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, defineComponent, nextTick } from 'vue';
import { ArrowDown, ArrowRight, Edit, Delete, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 生成唯一ID的函数
let idCounter = 0;
const generateId = () => {
  return `param-${++idCounter}`;
};

// 主组件逻辑
const paramForm = ref({
  type: 'string',
  name: '',
  value: ''
});

// 子参数列表 - 为每个参数添加唯一ID
const subParams = ref([]);

// 确保所有子参数都有唯一ID
const ensureParamsHaveIds = (params) => {
  if (!params) return;
  
  params.forEach(param => {
    if (!param.id) {
      param.id = generateId();
    }
    if (param.children && param.children.length > 0) {
      ensureParamsHaveIds(param.children);
    }
  });
};

// 参数编辑对话框
const editDialogVisible = ref(false);
const currentEditParam = ref(null);
const tempEditParam = ref({});

// 处理参数类型变化
const handleTypeChange = () => {
  if (paramForm.value.type === 'object') {
    // 如果切换为object类型，清空参数值
    paramForm.value.value = '';
  }
};

// 允许拖拽的判断函数
const allowDrop = (draggingNode, dropNode, type) => {
  // 只允许拖拽到object类型的节点内部
  if (type === 'inner' && dropNode.data.type !== 'object') {
    return false;
  }
  return true;
};

// 添加子参数到根节点
const addSubParam = () => {
  subParams.value.push({
    id: generateId(),
    type: 'string',
    name: '',
    value: '',
    children: []
  });
  ElMessage.success('子参数添加成功');
};

// 添加子参数到指定节点
const addChildParam = (node, data) => {
  if (!data.children) {
    data.children = [];
  }
  
  const newChild = {
    id: generateId(),
    type: 'string',
    name: '',
    value: '',
    children: []
  };
  
  data.children.push(newChild);
  // 确保视图更新
  nextTick(() => {
    // 展开父节点
    node.expand();
  });
};

// 编辑节点参数
const editNodeParam = (node, data) => {
  currentEditParam.value = data;
  tempEditParam.value = JSON.parse(JSON.stringify(data));
  editDialogVisible.value = true;
};

// 保存编辑的参数
const saveEditParam = () => {
  if (currentEditParam.value) {
    // 更新类型
    if (tempEditParam.value.type !== currentEditParam.value.type) {
      if (tempEditParam.value.type === 'object') {
        // 如果切换为object类型，清空值并确保有children数组
        tempEditParam.value.value = '';
        if (!tempEditParam.value.children) {
          tempEditParam.value.children = [];
        }
      } else if (currentEditParam.value.type === 'object') {
        // 如果从object切换到其他类型，清空children
        tempEditParam.value.children = [];
      }
    }
    
    // 复制所有属性
    Object.assign(currentEditParam.value, tempEditParam.value);
    
    // 确保所有子参数都有唯一ID
    if (currentEditParam.value.children && currentEditParam.value.children.length > 0) {
      ensureParamsHaveIds(currentEditParam.value.children);
    }
  }
  editDialogVisible.value = false;
  ElMessage.success('参数编辑成功');
};

// 处理节点数据变化
const handleNodeDataChange = (node, data) => {
  // 这个函数在节点内容变化时触发，确保视图更新
  // 由于我们直接修改了data对象，Vue会自动追踪变化
};

// 删除节点参数
const removeNodeParam = (node, data) => {
  const parent = node.parent;
  
  // 处理根节点的子参数
  if (parent.level === 0) {
    const index = subParams.value.findIndex(d => d.id === data.id);
    if (index !== -1) {
      subParams.value.splice(index, 1);
    }
  } else {
    // 处理非根节点的子参数
    const children = parent.data.children || [];
    const index = children.findIndex(d => d.id === data.id);
    if (index !== -1) {
      children.splice(index, 1);
    }
  }
  
  ElMessage.success('参数删除成功');
};

// 计算对象值预览
const objectValuePreview = computed(() => {
  if (paramForm.value.type !== 'object') return '';
  
  // 递归构建对象值
  const buildObjectValue = (params) => {
    const result = {};
    
    params.forEach(param => {
      if (!param.name) return; // 跳过没有名称的参数
      
      if (param.type === 'object' && param.children && param.children.length > 0) {
        // 递归处理子对象
        result[param.name] = buildObjectValue(param.children);
      } else if (param.type === 'number') {
        // 数字类型转换
        result[param.name] = Number(param.value) || 0;
      } else if (param.type === 'boolean') {
        // 布尔类型转换
        result[param.name] = param.value === 'true';
      } else {
        // 字符串和其他类型
        result[param.name] = param.value;
      }
    });
    
    return result;
  };
  
  const objectValue = buildObjectValue(subParams.value);
  return JSON.stringify(objectValue, null, 2);
});
</script>

<style scoped>
.parameter-panel {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 根参数样式 */
.root-parameter {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  background-color: #f8f8f8;
}

/* 树形结构样式 */
.parameter-tree {
  margin-top: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 10px;
}

/* 自定义树节点样式 */
.custom-tree-node {
  width: 100%;
  padding: 5px 0;
}

.parameter-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.parameter-title {
  display: flex;
  align-items: center;
  flex: 1;
}

.node-actions {
  display: flex;
  gap: 5px;
}

.param-type-badge {
  display: inline-block;
  margin-right: 8px;
  font-size: 12px;
  color: #fff;
  background-color: #409EFF;
  padding: 2px 6px;
  border-radius: 10px;
}

.param-name {
  font-weight: 500;
  margin-right: 10px;
  min-width: 80px;
}

.inline-value-input {
  width: 200px;
  margin-left: 10px;
}

.inline-add-btn {
  margin-left: 10px;
}

.param-row {
  display: flex;
  align-items: center;
}

.add-btn-col {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.result-preview {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f8f8;
  border-radius: 4px;
}

.result-preview pre {
  white-space: pre-wrap;
  word-break: break-all;
}

/* 对话框样式 */
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>