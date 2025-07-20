<template>
  <div class="app-container">
    <h1>参数配置面板示例</h1>
    <Panel />
  </div>
</template>

<script setup>
import Panel from './Panel.vue';
</script>

<style>
.app-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  color: #409EFF;
  margin-bottom: 20px;
}

/* 全局样式 */
body {
  margin: 0;
  padding: 0;
  background-color: #f5f7fa;
}
</style>