import type { LoginParams, LoginResult } from '@/types/login'
import { http } from '@/utils/http'

/**
 *
 * @param data 小程序登录请求参数
 *
 */
export const postLoginWxMinAPI = (data: LoginParams) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin',
    data: data,
  })
}

/**
 *
 * @param phoneNumber 手机号
 *
 *
 */
export const postLoginWxMinSimpleAPI = (phoneNumber: string) => {
  return http<LoginResult>({
    method: 'POST',
    url: '/login/wxMin/simple',
    data: {
      phoneNumber,
    },
  })
}
