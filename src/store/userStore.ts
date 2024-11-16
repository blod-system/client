import { create } from 'zustand'
import { getApi } from '../api/fetch';

export type UserInfo = {
  uid: number;
  account: string;
  name: string;
  email: string;
  birthday: string;
  phone: string | null;
  gender: 'women' | 'men';
  reminderDate: string;
  isReminder: 0 | 1;
}

type UserStore = {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
  getUserInfo: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: {
    uid: 1,
    account: '123',
    name: 'John Doe',
    email: 'johndoe@example.com',
    birthday: '1990-01-01',
    phone: '0912345678',
    gender: 'women',
    reminderDate: '2022-01-01',
    isReminder: 1,
  },
  getUserInfo: async () => {
    const response = await getApi({ apiPath: '/user/userInfo', })
    if (response.data) {
      set({ userInfo: response.data })
    }
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}))