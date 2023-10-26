<script setup lang="ts">
import { getHomeBannerApi, getHomeMutliApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
// 轮播图渲染数据
const bannerList = ref<HomeBanner>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerApi()
  bannerList.value = res.result
}

// 分类小图片
const mutilList = ref<HomeMutli>([])
const getHomeMutil = async () => {
  const res = await getHomeMutliApi()
  mutilList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
  getHomeMutil()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper :list="bannerList" />
  <CategoryPanel :list="mutilList" />
  <view class="index">666</view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
}
</style>
