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
      JSON.stringify(accounts.value.filter((account) => account.isValidate)),
    )
  }

  function addAccount() {
    let id: number
    if (accounts.value.length > 0) {
      id = accounts.value[accounts.value.length - 1].id + 1
    } else id = 1
    accounts.value.push({ id, labels: [], type: 'local', login: '', password: '', isValidate: false })
  }

  function updateAccount(newAccount: Account) {
    const index = accounts.value.findIndex((account) => (account.id = newAccount.id))
    if (index > -1 && validateAccount(newAccount)) {
      accounts.value[index] = newAccount
      saveToLocalStorage()
    } else {
      console.error('Аккаунта с таким id не существует')
    }
  }

  function deleteAccount(id: number) {
    accounts.value = accounts.value.filter((account) => account.id !== id)
    saveToLocalStorage()
  }

  function getLabelErrors(label: string): string[] {
    return label.length > 50 ? ['Максимум 50 символов'] : []
  }

  function getLoginErrors(login: string): string[] {
    if (!login.trim()) return ['Логин обязателен']
    if (login.length > 100) return ['Максимум 100 символов']
    return []
  }

  function getPasswordErrors(password: string): string[] {
    if (!password.trim()) return ['Пароль обязателен']
    if (password.length > 100) return ['Максимум 100 символов']
    return []
  }

  function validateAccount(account: Account) {
    if (
      getLabelErrors(account.labels.map((label) => label.text).join('; ')).length === 0 &&
      getLoginErrors(account.login).length === 0 &&
      getPasswordErrors(account.password).length === 0
    ) {
      account.isValidate = true
      return true
    }
  }

  return {
    accounts,
    addAccount,
    updateAccount,
    deleteAccount,
    loadFromLocalStorage,
    getLabelErrors,
    getLoginErrors,
    getPasswordErrors,
  }
})
