<template>
  <div class="page-container">
    <div class="top-container">
      <span>Учетные записи</span>
      <button
        @click="addNewAccount()"
        class="add-button"
      >
        <PlusIcon />
      </button>
    </div>
    <div class="info">
      <QuestionIcon />
      <span>
        Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;
      </span>
    </div>

    <div class="accounts">
      <AccountItem
        v-for="(account, index) in accounts"
        :key="`esoigsnge${index}`"
        :account="account"
        @update="
          (account) => {
            updateData(account)
          }
        "
        @delete="deleteAccount(account.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAccountsStore } from '@/stores/accounts'
  import { storeToRefs } from 'pinia'
  import type { Account } from '@/types'
  import AccountItem from '@/components/AccountItem.vue'
  import PlusIcon from '@/assets/plus.vue'
  import QuestionIcon from '@/assets/question.vue'

  const accountsStore = useAccountsStore()
  const { accounts } = storeToRefs(accountsStore)

  const addNewAccount = () => {
    accountsStore.addAccount()
  }
  const updateData = (account: Account) => {
    accountsStore.updateAccount(account)
  }
  const deleteAccount = (id: number) => {
    accountsStore.deleteAccount(id)
  }
</script>

<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .top-container {
      display: flex;
      gap: 10px;
      align-items: center;

      span {
        font-size: 20px;
        font-weight: bold;
        color: #333;
      }
    }

    .info {
      padding: 2px;
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: #ecf2f9;
      border-radius: 4px;

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .add-button {
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: center;

      border: 1px solid #d4dde6;
      border-radius: 6px;

      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }

      svg {
        width: 20px;
        height: 20px;
      }
    }

    .accounts {
    }
  }
</style>
