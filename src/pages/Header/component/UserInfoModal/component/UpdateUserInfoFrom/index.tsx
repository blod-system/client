import { Button, Form, Radio, Input, Switch, DatePicker } from 'antd'
import dayjs from "dayjs";
import { UpdateUserInfoData } from '../../../../types';

type PropsType = {
  userInfo: UpdateUserInfoData;
  onSubmit: (value: UpdateUserInfoData) => void
  onCancel: () => void;
}

export default function UpdateUserInfoFrom({ userInfo, onSubmit, onCancel }: PropsType) {
  function handelSubmitValueFormat(value: UpdateUserInfoData) {
    onSubmit(value)
  }

  return (
    <Form
      onFinish={handelSubmitValueFormat}
      initialValues={{
        ...userInfo,
        birthday: dayjs(userInfo?.birthday)
      }}
      labelCol={{ span: 5 }}
    >
      <Form.Item<UpdateUserInfoData>
        label="暱稱"
        name="name"
        rules={[{ required: true, message: '不可空白' }]}
      >
        <Input allowClear autoComplete='new-password' />
      </Form.Item>
      <Form.Item<UpdateUserInfoData>
        label='生日'
        name="birthday"
        rules={[{ required: true, message: '不可空白' }]}
      >
        <DatePicker placeholder='請選擇' format='YYYY/MM/DD' />
      </Form.Item>
      <Form.Item<UpdateUserInfoData>
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
      <Form.Item<UpdateUserInfoData>
        label="性別"
        name={'gender'}
      >
        <Radio.Group>
          <Radio value="women">女</Radio>
          <Radio value="men">男</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item<UpdateUserInfoData>
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
      <Form.Item<UpdateUserInfoData>
        label='捐血提醒'
        name='isReminderActive'
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>
      <div className='flex justify-evenly my-5'>
        <Button onClick={onCancel} color='default' variant='solid'>
          取 消
        </Button>
        <Button color='danger' variant='solid' htmlType='submit'>
          送出
        </Button>
      </div>
    </Form>
  )
}