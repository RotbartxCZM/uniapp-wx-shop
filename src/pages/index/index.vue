<script setup lang="ts">
import { getHomeBannerApi, getHomeMutliApi, getHotPanelApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { HomeBanner, HomeMutli, HotPanels } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
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

// 热门推荐
const hotPanelList = ref<HotPanels>([])
const getHotPanel = async () => {
  const res = await getHotPanelApi()
  hotPanelList.value = res.result
}

onLoad(() => {
  getHomeBannerData()
  getHomeMutil()
  getHotPanel()
})
</script>

<template>
  <CustomNavbar />
  <scroll-view scroll-y class="scroll-view">
    <XtxSwiper :list="bannerList" />
    <CategoryPanel :list="mutilList" />
    <HotPanel :list="hotPanelList" />
    <XtxGuess />
  </scroll-view>
</template>

<style lang="scss">
//
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
}
</style>
