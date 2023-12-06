import type { AddressItems } from '@/types/goods'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const userAddressStore = defineStore('address', () => {
  const selectedAddress = ref<AddressItems>()
  const changeSelectedAddress = (val: AddressItems) => {
    selectedAddress.value = val
  }
  return {
    selectedAddress,
    changeSelectedAddress,
  }
})
