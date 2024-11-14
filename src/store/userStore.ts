import { create } from 'zustand'
import { getApi } from '../api/fetch';

export type UserInfo = {
  uid: number;
  name: string;
  email: string;
  birthday: string;
  phone: string | null;
  reminderDate: string;
  isReminder: 0 | 1;
  reminder: 0 | 1
}
type UserStore = {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
  clearUserInfo: () => void;
  getUserInfo: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
  userInfo: null,
  getUserInfo: async () => {
    const response = await getApi({ apiPath: '/user/userInfo', })
    if (response.data) {
      set({ userInfo: response.data })
    }
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}))