import { Modal, Button, Form, DatePicker, Upload, Input, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { RecordData, RecordParams } from '../../types'


type PropsType = {
  modalType: 'edit' | 'create'
  isShow: boolean;
  data: RecordData | null
  onCancel: () => void
  onConfirm: (value: RecordParams) => void
}


export function RecordModal({ isShow, modalType, data, onCancel, onConfirm }: PropsType) {
  console.log("data", data)
  const [form] = Form.useForm();
  const defaultFileList: UploadFile[] = [
    {
      uid: String(data?.uid),
      name: data?.reportUrl ? data.reportUrl.split('/pdf/')[2] : '',
      status: 'done',
      url: data?.reportUrl ?? '',
    },
  ]

  function onSubmit() {
    const formData = form.getFieldsValue()
    onConfirm(
      {
        ...formData,
        ...data?.id && { id: data.id }
      }
    )
  }

  return (
    <Modal
      centered
      open={isShow}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <p className="text-center text-xl font-bold mb-8">
        {modalType === 'create' ? '新 增' : '編 輯'} 捐 血 紀 錄
      </p>
      <div className='px-4'>
        <Form
          {...data ? {
            initialValues: {
              ...data,
              date: dayjs(data?.date)
            }
          } : undefined}
          form={form}
          labelCol={{ span: 5 }}
        >
          <Form.Item<RecordData>
            label='捐血日期'
            name='date'
            rules={[{ required: true, message: '不可空白' }]}
          >
            <DatePicker className="max-w-36 min-w-36" placeholder="請選擇捐血日期" />
          </Form.Item>
          <Form.Item<RecordData>
            label='捐血量'
            name='volumeMl'
            rules={[
              { required: true, message: '不可空白' },
              { pattern: /^(250|500)$/, message: '捐血血量僅有 250、500 兩種' }
            ]}
          >
            <Input maxLength={3} suffix="cc" className="max-w-36 min-w-36" />
          </Form.Item>
          <Form.Item<RecordData>
            label='捐血報告'
            name='reportUrl'
          >
            <Upload
              action={`${import.meta.env.VITE_API_URL}/upload`}
              listType="picture-card"
              maxCount={1}
              accept=".pdf"
              {...data?.reportUrl ? { defaultFileList } : undefined}
            >
              <button>
                <PlusOutlined />
                <div className="mt-2">Upload</div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <div className=" flex justify-evenly">
              <Button color="primary" variant="solid" onClick={onCancel}>取消</Button>
              <Button color="danger" variant="solid" onClick={onSubmit}>
                {modalType === 'create' ? '新增' : '保存'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  )
}