import type { AddressForm, AddressParams } from '@/types/adress'
import { http } from '@/utils/http'

/**
 * 添加收货地址 ?
 */
export const postAdressAPI = (data: AddressParams) => {
  http({
    url: '/member/address',
    method: 'POST',
    data: data,
  })
}
/**
 * 修改收货地址
 */
export const putAdressAPI = (id: string, data: AddressParams) => {
  http({
    url: `/member/address/${id}`,
    method: 'PUT',
    data: data,
  })
}
/**
 * 获取收货地址详情
 * @param id 地址id(路径参数)
 */
export const getMemberAddressByIdAPI = (id: string) => {
  return http<AddressForm>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}
/**
 * 获取收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressForm>({
    method: 'GET',
    url: '/member/address',
  })
}
/**
 * 删除收货地址
 * @param id 地址id(路径参数)
 */
export const deleteMemberAddressByIdAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
