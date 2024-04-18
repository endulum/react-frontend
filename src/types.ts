export interface IUser {
  username: string
  id: string
}

export type TFormErrors = Array<{
  path: string
  value: string
  msg: string
}>
