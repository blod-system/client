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
  isReminderActive: 0 | 1;
}

export type UserInfoResponse = Omit<UserInfo, 'isReminderActive' | 'reminderDate'> & {
  is_reminder_active: 0 | 1;
  reminder_date: string;
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
    const response = await getApi<UserInfoResponse>({ apiPath: '/user/userInfo', })
    if (response.data) {
      set({
        userInfo: {
          uid: response.data?.uid,
          account: response.data?.account,
          name: response.data?.name,
          birthday: response.data?.birthday,
          email: response.data?.email,
          gender: response.data?.gender === 'women' ? 'women' : 'men',
          phone: response.data?.phone,
          isReminderActive: response.data.is_reminder_active,
          reminderDate: response.data.reminder_date
        }
      })
    }
  },
  setUserInfo: (userInfo) => set({ userInfo }),
  clearUserInfo: () => set({ userInfo: null }),
}))