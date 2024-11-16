import { useState } from 'react'
import { RecordTable } from "./component/RecordTable";
import { RecordModal } from './component/RecordModal';
import { PlusOutlined } from '@ant-design/icons';
import { useUserStore } from '../../store/userStore';
import type { DataType, FormDataType } from './types'


export default function Records() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [modalData, setModalData] = useState<FormDataType | null>(null);
  const user = useUserStore(i => i.userInfo);

  const data: DataType[] = [
    {
      id: 1,
      uid: 1,
      date: '2022-01-01',
      volumeMl: 500,
      reportUrl: 'https://pub-f98ae2284fcc475493d4204d4b2a3a0a.r2.dev/pdf/aabbcc.pdf',
    },
  ]

  function openCreateModal() {
    setModalType('create')
    setModalData(null)
    setShowCreateModal(true)
  }

  function openEditModal(value: FormDataType) {
    setModalType('edit')
    setModalData({ ...value })
    setShowCreateModal(true)
  }

  function handelSubmitRecord(value: FormDataType) {
    console.log(value)
  }

  return (
    <div className="mt-10">
      <RecordModal
        isShow={showCreateModal}
        modalType={modalType}
        onCancel={() => setShowCreateModal(false)}
        onConfirm={handelSubmitRecord}
        data={modalData}
      />
      {user ?
        <>
          <div className='text-end mb-5'>
            <button
              className='px-4 py-1 border-blue-500 border-2 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white '
              onClick={openCreateModal}
            >
              <PlusOutlined className='text-xl mr-3' />
              新 增
            </button>
          </div>
          <RecordTable dataSource={data} openEditModal={openEditModal} />
        </>
        : <p className='text-center text-3xl font-bold'>請 先 登 入</p>
      }
    </div>
  )
}