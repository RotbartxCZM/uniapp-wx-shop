<script setup lang="ts">
import { getHotRecommendAPI } from '@/services/hot'
import type { SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]
// uni 获取页面参数
const query = defineProps<{
  type: string
}>()
// 目前所在的页面
const currUrlMap = hotMap.find((item) => item.type === query.type)
// 动态设置标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

// 全部列表数据
const hotList = ref<SubTypeItem & { finsh?: boolean }>([])
// 轮播图
const bannerPicture = ref('')
const getHotRecommendList = async () => {
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    // 初始值，开发环境方便调试设为30
    page: import.meta.env.DEV ? 30 : 1,
    pageSize: 10,
  })
  // 获取轮播图图片
  bannerPicture.value = res.result.bannerPicture
  // 获取总数据列表
  hotList.value = res.result.subTypes
}
// 高亮的响应式数据
const activeIndex = ref(0)

// 结束标记
const finsh = ref(false)
// 滚动到底
const onScrolltolower = async () => {
  // 获取当前选项 -- 传数据
  const tabType = hotList.value[activeIndex.value]
  // 分页条件
  if (tabType.goodsItems.page < tabType.goodsItems.pages) {
    // 页码累加
    tabType.goodsItems.page++
  } else {
    finsh.value = true
    return uni.showToast({
      icon: 'none',
      title: '没有更多数据了~',
      mask: true,
    })
  }
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subType: tabType.id,
    page: tabType.goodsItems.page,
    pageSize: tabType.goodsItems.pageSize,
  })
  // 新列表选项
  const newHotList = res.result.subTypes[activeIndex.value]
  tabType.goodsItems.items.push(...newHotList.goodsItems.items)
}

onLoad(() => {
  getHotRecommendList()
})
</script>

<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项active -->
    <view class="tabs">
      <text
        @tap="activeIndex = index"
        class="text"
        :class="{ active: index === activeIndex }"
        v-for="(item, index) in hotList"
        :key="item.id"
      >
        {{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      class="scroll-view"
      v-for="(item, index) in hotList"
      :key="item.id"
      v-show="activeIndex === index"
      @scrolltolower="onScrolltolower"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ finsh ? '没有更多数据了~' : '正在加载...' }}</view>
    </scroll-view>
  </view>
</template>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
