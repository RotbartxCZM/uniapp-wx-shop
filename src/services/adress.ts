import type { AdressForm, AdressParams } from '@/types/adress'
import { http } from '@/utils/http'

/**
 * 添加收货地址
 */
export const postAdressAPI = (data: AdressParams) => {
  http({
    url: '/member/address',
    method: 'POST',
    data: data,
  })
}
/**
 * 修改收货地址
 */
export const putAdressAPI = (id: string, data: AdressParams) => {
  http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data: data,
  })
}
/**
 * 获取收货地址
 */
export const getAdressAPI = (id: string) => {
  http<AdressForm>({
    url: `/member/address/${id}`,
    method: 'GET',
  })
}
