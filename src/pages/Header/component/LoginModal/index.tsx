import { Button, Form, Input, Modal } from 'antd'
import { LoginParam } from '../../types'

type PropsType = {
  isShow: boolean;
  onConfirm: (param: LoginParam) => void;
  onCancel: () => void;
  onOpenSignUp: () => void
}

export default function LoginModal({ isShow, onCancel, onConfirm, onOpenSignUp }: PropsType) {

  return (
    <Modal
      destroyOnClose
      centered
      open={isShow}
      onCancel={onCancel}
      footer={null}
    >
      <p className='text-center text-2xl font-bold'>登 入</p>
      <div className='px-10 pt-5'>
        <Form onFinish={onConfirm}>
          <Form.Item<LoginParam>
            label="帳號"
            name="account"
            rules={[{ required: true, message: '不可空白' }]}
          >
            <Input allowClear autoComplete='new-password' />
          </Form.Item>
          <Form.Item<LoginParam>
            label="密碼"
            name="password"
            rules={[{ required: true, message: '不可空白' }]}
          >
            <Input.Password allowClear autoComplete='new-password' />
          </Form.Item>
          <div className='text-right'>
            <Button onClick={onOpenSignUp} color='primary' variant='link' >
              註冊
            </Button>
          </div>
          <Form.Item label={null}>
            <div className='flex justify-evenly mt-5'>
              <Button onClick={onCancel} color='default' variant='solid'>
                取消
              </Button>
              <Button color='danger' variant='solid' htmlType='submit'>
                登入
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}