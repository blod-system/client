export type LoginParam = {
  account: string;
  password: string;
}

export type SignUpParam = {
  account: string;
  password: string;
  name: string;
  birthday: string;
  email: string;
  phone: string;
  gender: 'women' | 'men'
}

export type UpdateUserInfoParam = Omit<SignUpParam, 'account' | 'password'> & {
  isReminder: 0 | 1
}