import { Modal } from 'antd'
import { useUserStore } from '../../../../store/userStore';
import { UpdateUserInfoParam } from '../../types';
import { useState } from 'react';
import UserInfo from './component/UserInfo';
import UpdateUserInfoFrom from './component/UpdateUserInfoFrom';

type PropsType = {
  isShow: boolean;
  onConfirm: (value: UpdateUserInfoParam) => void;
  onCancel: () => void;

}

export function UserInfoModal({ isShow, onCancel, onConfirm }: PropsType) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const user = useUserStore()

  const { userInfo } = user
  function closeModal() {
    setIsEdit(false)
    onCancel()
  }

  function onSubmit(value: UpdateUserInfoParam) {
    setIsEdit(false)
    onConfirm(value)
  }

  return (
    <Modal
      open={isShow}
      onCancel={closeModal}
      footer={null}
    >
      <p className='text-center text-2xl font-bold mb-5'>個 人 資 料</p>
      <div className='border-blue-400 border-dashed border-2 p-4 text-lg rounded-md'>
        {isEdit ?
          <UpdateUserInfoFrom
            userInfo={userInfo as UpdateUserInfoParam}
            onCancel={() => setIsEdit(false)}
            onSubmit={onSubmit}
          />
          :
          <UserInfo userInfo={userInfo!} onCancel={closeModal} onEdit={() => setIsEdit(true)} />
        }
      </div>
    </Modal>
  )
}