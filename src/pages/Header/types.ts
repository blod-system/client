export type LoginParam = {
  account: string;
  password: string;
}

export type SignUpParam = {
  account: string;
  password: string;
  name: string;
  birthday: string | Date;
  email: string;
  phone: string;
  gender: 'women' | 'men'
}

export type UpdateUserInfoData = Omit<SignUpParam, 'account' | 'password'> & {
  isReminderActive: 0 | 1
}

export type UpdateUserInfoParams = Omit<UpdateUserInfoData, 'isReminderActive'> & {
  is_reminder_active: 0 | 1
}
