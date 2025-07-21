export type Account = {
  id: number
  labels: LabelItem[]
  type: 'ldap' | 'local'
  login: string
  password: string
  isValidate: boolean
}

export type LabelItem = {
  text: string
}

export const accountSelectTypes = [
  { title: 'LDAP', value: 'ldap' },
  { title: 'Локальная', value: 'local' },
]
