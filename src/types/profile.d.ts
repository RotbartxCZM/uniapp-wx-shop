import type { BaseProfile } from './global'

export type ProfileDetail = BaseProfile & {
  /** 性别 */
  gender?: '女' | '男'
  /** 生日 */
  birthday?: string
  /** 省市区 */
  fullLocation?: string
  /** 职业 */
  profession?: string
}
