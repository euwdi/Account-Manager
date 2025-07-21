<template>
  <v-card>
    <v-row>
      <v-text-field
        v-model="labelInput"
        label="Метка"
        :hint="'Введите метки через точку с запятой (максимум 50 символов)'"
        persistent-hint
        :error-messages="errors.labels"
        @blur="onBlur('labels')"
      />
      <v-select
        v-model="account.type"
        label="Тип записи"
        :items="accountSelectTypes"
        @update:model-value="updateAccount(account)"
      />
      <v-text-field
        v-model="account.login"
        label="Логин"
        :counter="100"
        :error-messages="errors.login"
        @blur="onBlur('login')"
      />
      ff
      <v-text-field
        v-model="account.password"
        label="Пароль"
        :type="showPassword ? 'text' : 'password'"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        @click:append-inner="showPassword = !showPassword"
        :error-messages="errors.password"
        @blur="onBlur('password')"
      />
      <v-btn
        @click="deleteAccount"
        icon="mdi-delete"
      />
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Account, accountSelectTypes } from '@/types'
  import { useAccountsStore } from '@/stores/accounts'

  const props = defineProps<{
    account: Account
  }>()

  const emit = defineEmits<{
    (e: 'update', data: Account): void
    (e: 'delete', id: number): void
  }>()

  const { getLabelErrors, getLoginErrors, getPasswordErrors, updateAccount } = useAccountsStore()

  const account = ref<Account>(props.account)
  const labelInput = ref<string>(account.value.labels.map((label) => label.text).join('; '))
  const showPassword = ref<boolean>(false)

  const touchedInputs = ref<{
    labels: boolean
    login: boolean
    password: boolean
  }>({
    labels: false,
    login: false,
    password: false
  })

  const errors = ref<{ labels: string[]; login: string[]; password: string[] }>({
    labels: [],
    login: [],
    password: []
  })

  function onBlur(field: 'password' | 'login' | 'labels') {
    if (field === 'labels') parseLabel()

    touchedInputs.value[field] = true
    updateAccount(account.value)
  }

  function parseLabel() {
    account.value.labels = labelInput.value
      .trim()
      .split(';')
      .map((label) => ({ text: label.trim() }))
  }

  function deleteAccount() {
    emit('delete', account.value.id)
  }
</script>
