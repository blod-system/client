export type LoginParam = {
  account: string;
  password: string;
}

export type SignUpParam = {
  account: string;
  password: string;
  birthday: string;
  email: string;
  phone: string | null;
}