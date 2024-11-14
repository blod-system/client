import { Modal, Button } from 'antd';

type PropsType = {
  isShow: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function LogoutModal({ isShow, onCancel, onConfirm }: PropsType) {
  return (
    <Modal
      centered
      open={isShow}
      onCancel={onCancel}
      onOk={onConfirm}
      okText='登出'
      cancelText='取消'
      footer={null}
    >
      <p className='text-center text-2xl font-bold mb-5'>登出</p>
      <p className='text-center text-xl font-medium mb-7'>確 認 要 登 出 嗎 ？</p>
      <div className='flex justify-evenly mt-5'>
        <Button onClick={onCancel} color='default' variant='solid'>
          取消
        </Button>
        <Button color='danger' variant='solid' htmlType='submit'>
          登出
        </Button>
      </div>
    </Modal>
  )
}