<script setup lang="ts">
import { getHomeBannerApi, getHomeMutliApi, getHotPanelApi } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { HomeBanner, HomeMutli, HotPanels } from '@/types/home'
import CustomNavbar from './components/CustomNavbar.vue'
import CategoryPanel from './components/CategoryPanel.vue'
import HotPanel from './components/HotPanel.vue'
import type { XtxGuessInstance } from '@/types/component'
import PageSkeleton from './components/PageSkeleton.vue'
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

// 滚动触底
const gusseRef = ref<XtxGuessInstance>()
const onScrolltolower = () => {
  gusseRef.value?.getMore()
}

// 下拉刷新
const isTrigger = ref(false)
const onRefresherrefresh = async () => {
  isTrigger.value = true
  // 获取数据
  // 不加await,同步任务先执行不会等待异步执行完毕，加await任务会排队进行性能差
  // await getHomeBannerData()
  // await getHomeMutil()
  // await getHotPanel()
  // setTimeout(function () {
  //   isTrigger.value = false
  //   console.log('计时开始')
  // }, 2000)
  // 重置猜你喜欢页面数据
  gusseRef.value?.resetData()
  await Promise.all([getHomeBannerData(), getHomeMutil(), getHotPanel(), gusseRef.value?.getMore()])
  isTrigger.value = false
}

// 是否加载骨架屏
const isLoading = ref(false)

onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeMutil(), getHotPanel()])
  isLoading.value = false
})
</script>

<template>
  <CustomNavbar />
  <scroll-view
    scroll-y
    class="scroll-view"
    @scrolltolower="onScrolltolower"
    refresher-enabled
    @refresherrefresh="onRefresherrefresh"
    :refresher-triggered="isTrigger"
  >
    <!-- 骨架屏 -->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <XtxSwiper :list="bannerList" />
      <CategoryPanel :list="mutilList" />
      <HotPanel :list="hotPanelList" />
      <XtxGuess ref="gusseRef" />
    </template>
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
