<template>
  <v-card flat>
    <v-row no-gutters>
      <v-col
        md="5"
        class="pr-2"
      >
        <v-text-field
          v-model="labelInput"
          label="Метка"
          :error-messages="errors.labels"
          :counter="50"
          @blur="onBlur('labels')"
        />
      </v-col>
      <v-col
        md="2"
        class="pr-2"
      >
        <v-select
          v-model="account.type"
          label="Тип записи"
          :items="accountSelectTypes"
          @update:model-value="emit('update', account)"
        />
      </v-col>
      <v-col
        :md="account.type === 'local' ? 2 : 4"
        class="pr-2"
      >
        <v-text-field
          v-model="account.login"
          label="Логин"
          :counter="100"
          :error-messages="errors.login"
          @blur="onBlur('login')"
        />
      </v-col>
      <v-col
        md="2"
        class="pr-2"
        v-if="account.type === 'local'"
      >
        <v-text-field
          v-model="account.password"
          label="Пароль"
          :counter="100"
          :type="showPassword ? 'text' : 'password'"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
          :error-messages="errors.password"
          @blur="onBlur('password')"
        />
      </v-col>
      <v-col
        md="1"
        class="pr-2"
        align="center"
      >
        <v-btn
          variant="flat"
          @click="emit('delete', account.id)"
          icon="mdi-trash-can-outline"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import type { Account } from '@/types'

  const props = defineProps<{
    account: Account
  }>()

  const emit = defineEmits<{
    (e: 'update', data: Account): void
    (e: 'delete', id: number): void
  }>()

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

    if (validateAccount()) {
      emit('update', account.value)
    } else {
      if (field === 'labels') {
        errors.value.labels = getLabelErrors()
      }
      if (field === 'login') {
        errors.value.login = getLoginErrors()
      }
      if (field === 'password') {
        errors.value.password = getPasswordErrors(a)
      }
    }
  }

  function parseLabel() {
    account.value.labels = labelInput.value
      .trim()
      .split(';')
      .map((label) => ({ text: label.trim() }))
  }

  const accountSelectTypes = [
    { title: 'LDAP', value: 'ldap' },
    { title: 'Локальная', value: 'local' }
  ]

  function getLabelErrors() {
    const labellString = account.value.labels.map((label) => label.text).join('; ')

    return labellString.length > 50 ? ['Максимум 50 символов'] : []
  }

  function getLoginErrors() {
    const login = account.value.login

    if (!login.trim()) return ['Логин обязателен']
    if (login.length > 100) return ['Максимум 100 символов']
    return []
  }

  function getPasswordErrors() {
    const password = account.value.password

    if (!password.trim()) return ['Пароль обязателен']
    if (password.length > 100) return ['Максимум 100 символов']
    return []
  }

  function validateAccount() {
    if (
      account.value.type === 'ldap' &&
      getLabelErrors().length === 0 &&
      getLoginErrors().length === 0
    ) {
      account.value.isValidate = true
      return true
    }

    if (
      getLabelErrors().length === 0 &&
      getLoginErrors().length === 0 &&
      getPasswordErrors().length === 0
    ) {
      account.value.isValidate = true
      return true
    }
  }
</script>
