import { Button, Form, Input, Modal, Radio } from 'antd'
import { SignUpParam } from '../../types'

type PropsType = {
  isShow: boolean;
  onConfirm: (param: SignUpParam) => void;
  onCancel: () => void;
}

export default function SignUpModal({ isShow, onCancel, onConfirm }: PropsType) {

  return (
    <Modal
      destroyOnClose
      centered
      open={isShow}
      onCancel={onCancel}
      footer={null}
    >
      <p className='text-center text-2xl font-bold'>註 冊</p>
      <div className='px-5 pt-5'>
        <Form
          onFinish={onConfirm}
          initialValues={{ 'gender': 'women' }}
          labelCol={{ span: 5 }}
        >
          <Form.Item<SignUpParam>
            label="帳號"
            name="account"
            rules={[{ required: true, message: '不可空白' }]}
          >
            <Input allowClear autoComplete='new-password' />
          </Form.Item>
          <Form.Item<SignUpParam>
            label="密碼"
            name="password"
            rules={[{ required: true, message: '不可空白' }]}
          >
            <Input.Password allowClear autoComplete='new-password' />
          </Form.Item>
          <Form.Item<SignUpParam>
            label="暱稱"
            name="name"
            rules={[{ required: true, message: '不可空白' }]}
          >
            <Input allowClear autoComplete='new-password' />
          </Form.Item>
          <Form.Item<SignUpParam>
            label="email"
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
          <Form.Item<SignUpParam>
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
          <Form.Item<SignUpParam>
            label="性別"
            name={'gender'}
          >
            <Radio.Group>
              <Radio value="women">女</Radio>
              <Radio value="men">男</Radio>
            </Radio.Group>
          </Form.Item>
          <div className='flex justify-evenly my-5'>
            <Button onClick={onCancel} color='default' variant='solid'>
              取消
            </Button>
            <Button color='danger' variant='solid' htmlType='submit'>
              送出
            </Button>
          </div>
        </Form>
      </div>
    </Modal >
  )
}