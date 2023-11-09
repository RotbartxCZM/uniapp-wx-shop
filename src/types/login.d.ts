/**
 * 小程序登录请求体
 */
export type LoginParams = {
  /** 通过 wx.login() 获取 */
  code: string
  /** 通过 getphonenumber 事件回调中获取 */
  encryptedData: string
  /** 通过 getphonenumber 事件回调中获取 */
  iv: string
}
/** 小程序登录 登录用户信息 */
export type LoginResult = {
  /** 用户ID */
  id: number
  /** 头像  */
  avatar: string
  /** 账户名  */
  account: string
  /** 昵称 */
  nickname?: string
  /** 手机号 */
  mobile: string
  /** 登录凭证 */
  token: string
}
