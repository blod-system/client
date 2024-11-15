import { Modal, Button, Form, Radio, Input, Switch, DatePicker } from 'antd'
import { useUserStore } from '../../../../store/userStore';
import { UpdateUserInfoParam } from '../../types';
import { useState } from 'react';
import UserInfo from './component/UserInfo';
import dayjs from "dayjs";

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

  // const data: UpdateUserInfoParam = {
  //   name: userInfo?.name ?? '',
  //   birthday: userInfo?.birthday ?? new Date().toLocaleDateString(),
  //   phone: userInfo?.phone ?? '',
  //   gender: userInfo?.gender ?? 'women',
  //   email: userInfo?.email ?? '',
  //   isReminder: userInfo?.isReminder ?? 1,
  // }

  return (
    <Modal
      open={isShow}
      onCancel={closeModal}
      footer={null}
    >
      <p className='text-center text-2xl font-bold mb-5'>個 人 資 料</p>
      <div className='border-blue-400 border-dashed border-2 p-4 text-lg rounded-md'>
        {isEdit ?
          <Form
            onFinish={onConfirm}
            initialValues={{
              ...userInfo,
              birthday: dayjs(userInfo?.birthday ?? new Date().toLocaleDateString())
            }}
            labelCol={{ span: 5 }}
          >
            <Form.Item<UpdateUserInfoParam>
              label="暱稱"
              name="name"
              rules={[{ required: true, message: '不可空白' }]}
            >
              <Input allowClear autoComplete='new-password' />
            </Form.Item>
            <Form.Item<UpdateUserInfoParam>
              label='生日'
              name="birthday"
              rules={[{ required: true, message: '不可空白' }]}
            >
              <DatePicker placeholder='請選擇' format='YYYY/MM/DD' />
            </Form.Item>
            <Form.Item<UpdateUserInfoParam>
              label="手機"
              name="phone"
              rules={
                [
                  { required: true, message: '不可空白' },
                  { pattern: /^09\d{8}$/, message: "格式不符" }
                ]
              }
            >
              <Input allowClear autoComplete='new-password' max={10} />
            </Form.Item>
            <Form.Item<UpdateUserInfoParam>
              label="性別"
              name={'gender'}
            >
              <Radio.Group>
                <Radio value="women">女</Radio>
                <Radio value="men">男</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item<UpdateUserInfoParam>
              label="E-mail"
              name="email"
              rules={
                [
                  {
                    required: true,
                    message: '不可空白'
                  },
                  {
                    pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "格式不符"
                  }
                ]}
            >
              <Input allowClear autoComplete='new-password' />
            </Form.Item>
            <Form.Item<UpdateUserInfoParam>
              label='捐血提醒'
              name='isReminder'
            >
              <Switch />
            </Form.Item>
            <div className='flex justify-evenly my-5'>
              <Button onClick={() => setIsEdit(false)} color='default' variant='solid'>
                取 消
              </Button>
              <Button color='danger' variant='solid' htmlType='submit'>
                送出
              </Button>
            </div>
          </Form>
          :
          <UserInfo userInfo={userInfo!} onCancel={closeModal} onEdit={() => setIsEdit(true)} />
        }
      </div>
    </Modal>
  )
}