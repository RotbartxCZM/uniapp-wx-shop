<script setup lang="ts">
// 普通页
import { ref } from 'vue'
import CartMain from './components/CartMain.vue'
// 是否获取安全距离
const isShow = ref(true)
</script>
<template>
  <CartMain :isShow="isShow" />
</template>
<style scoped></style>
