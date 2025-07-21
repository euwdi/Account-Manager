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