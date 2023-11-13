import type { XtxGuessInstance } from '@/types/component'
import { ref } from 'vue'

/**
 * 猜你喜欢的组合式函数
 * @returns
 */
export const useGuessList = () => {
  // 获取猜你喜欢组件实例
  const guessRef = ref<XtxGuessInstance>()

  // 滚动触底函数
  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  // 返回
  return {
    guessRef,
    onScrolltolower,
  }
}
