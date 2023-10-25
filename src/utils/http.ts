// 此文件不需要export,直接导入即可使用
import { useMemberStore } from '@/stores'

// 实例化member
const memberStore = useMemberStore()

// 请求基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 拦截器配置
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 1. 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      // 配置基地址
      options.url = baseURL + options.url
    }
    // 请求超时,默认60s
    options.timeout = 10000
    //  添加小程序端请求头标识
    options.header = {
      // 自定义标识头,由后端的接口文档提供
      'source-client': 'miniapp',
      ...options.header,
    }
    //  添加 token 请求头标识
    const memberStore = useMemberStore()
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}

// 拦截 request 请求
uni.addInterceptor('request', httpInterceptor)
// 拦截 uploadFile 文件上传
uni.addInterceptor('uploadFile', httpInterceptor)

/**
 * 请求函数
 * @param  UniApp.RequestOptions
 * @returns Promise
 *  1. 返回 Promise 对象，用于处理返回值类型
 *  2. 获取数据成功
 *    2.1 提取核心数据 res.data
 *    2.2 添加类型，支持泛型
 *  3. 获取数据失败
 *    3.1 401错误  -> 清理用户信息，跳转到登录页
 *    3.2 其他错误 -> 根据后端错误信息轻提示
 *    3.3 网络错误 -> 提示用户换网络
 */

// Data<T>创建一个名为T的泛型,T的类型由发起请求时所需数据定
type Data<T> = {
  code: number
  msg: string
  result: T
}

// promise ts写法
// http = <T1> -- 创建泛型供以下带泛型的参数使用
export const http = <T1>(options: UniApp.RequestOptions) => {
  return new Promise<Data<T1>>((resolve, reject) => {
    uni.request({
      ...options,
      // 请求成功(只要服务器反应就调用success 但有404等情况)
      success(res) {
        // 状态码为2xx才调用resolve
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 提供核心数据 类型断言res. data
          resolve(res.data as Data<T1>)
        } else if (res.statusCode === 401) {
          memberStore.clearProfile()
          uni.navigateTo({ url: '/pages/login/login' })
          reject(res)
        } else {
          uni.showToast({
            title: (res.data as Data<T1>).msg || '请求错误',
            icon: 'error',
            mask: true,
          })
        }
        reject(res)
      },
      // 响应失败(网络问题)
      fail(err) {
        uni.showToast({
          title: '网络连接失败,换一个网络试试',
          icon: 'error',
          mask: true,
        })
      },
    })
  })
}
