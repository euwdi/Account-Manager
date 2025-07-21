import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<unknown[]>([])

  return {
    accounts,
  }
})
