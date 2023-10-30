import { http } from '@/utils/http'
import type { GuessItem, HomeBanner, HomeMutli, HotPanels } from '../types/home'
import type { PageParams, PageResult } from '@/types/global'
/**
 *
 * 首页-广告区域
 * @param distributionSite 广告区域展示位置,1 为首页（默认值)2 为商品分类页
 * @returns id: id
 */

export const getHomeBannerApi = (distributionSite = 1) => {
  return http<HomeBanner>({
    method: 'GET',
    url: '/home/banner',
    data: {
      distributionSite,
    },
  })
}
/**
 *
 * 首页-前台分类
 *
 */
export const getHomeMutliApi = () => {
  return http<HomeMutli>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}
/**
 * 首页-热门推荐-小程序
 */
export const getHotPanelApi = () => {
  return http<HotPanels>({
    method: 'GET',
    url: '/home/hot/mutli',
  })
}
/**
 * 猜你喜欢-小程序 --- type import
 */
export const getGuessLikeApi = (data: PageParams) => {
  return http<PageResult<GuessItem>>({
    method: 'GET',
    url: '/home/goods/guessLike',
    data,
  })
}
