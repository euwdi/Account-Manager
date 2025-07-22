import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Account } from '@/types'

export const useAccountsStore = defineStore('accounts', () => {
  const accounts = ref<Account[]>(loadFromLocalStorage())

  function loadFromLocalStorage(): Account[] {
    const saved = localStorage.getItem('accounts')
    return saved ? JSON.parse(saved) : []
  }

  function saveToLocalStorage() {
    localStorage.setItem(
      'accounts',
      JSON.stringify(accounts.value.filter((account) => account.isValidate))
    )
  }

  function addAccount() {
    const lastElement = accounts.value.at(-1)
    accounts.value.push({
      id: lastElement ? lastElement.id + 1 : 1,
      labels: [],
      type: 'local',
      login: '',
      password: '',
      isValidate: false
    })
  }

  function updateAccount(newAccount: Account) {
    const index = accounts.value.findIndex((account) => (account.id === newAccount.id))
    if (index === -1) {
      console.error('Аккаунта с таким id не существует')
      return
    }

    accounts.value[index] = {...newAccount}
    saveToLocalStorage()
  }

  function deleteAccount(id: number) {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    saveToLocalStorage()
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    loadFromLocalStorage,
  }
})
