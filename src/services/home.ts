import { http } from '@/utils/http'
import './home.d'
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
