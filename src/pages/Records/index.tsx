import { useCallback, useEffect, useState } from 'react'
import { RecordTable } from "./component/RecordTable";
import { RecordModal } from './component/RecordModal';
import { PlusOutlined } from '@ant-design/icons';
import { useUserStore } from '../../store/userStore';
import { addRecord, getRecords, updateRecord } from '../../api/recordApi';
import { message } from 'antd';
import type { RecordData } from './types'

export default function Records() {
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false)
  const [modalType, setModalType] = useState<'create' | 'edit'>('create')
  const [modalData, setModalData] = useState<RecordData | null>(null);
  const [dataSource, setDataSource] = useState<RecordData[] | null>(null)
  const [messageBox, content] = message.useMessage()
  const user = useUserStore(i => i.userInfo);

  function openCreateModal() {
    setModalType('create')
    setModalData(null)
    setShowCreateModal(true)
  }

  function openEditModal(value: RecordData) {
    setModalType('edit')
    setModalData({ ...value })
    setShowCreateModal(true)
  }

  const handelGetRecordTable = useCallback(async () => {
    if (user) {
      const response = await getRecords(user?.uid)

      if (response.status === 200) {
        const data: RecordData[] = response.data.map((item) => ({
          id: item.id,
          uid: item.uid,
          date: new Date(item.date),
          volumeMl: item.volume_ml,
          reportUrl: item.report_url,
        }))

        setDataSource(data)
      }
    }
  }, [user])

  async function handelSubmitRecord(value: RecordData) {
    const params = {
      uid: value.uid,
      date: new Date(value.date),
      volume_ml: value.volumeMl,
      report_url: value.reportUrl,
      ...(value.id && { id: value.id })
    }

    const response = modalType === 'create' ? await addRecord(params) : await updateRecord(params)

    if (response.status === 200) {
      messageBox.open({
        type: 'success',
        content: response.message
      })
      await handelGetRecordTable()
    } else {
      messageBox.open({
        type: 'error',
        content: response.message
      })
    }
  }

  useEffect(() => {
    handelGetRecordTable()
  }, [handelGetRecordTable, user])

  return (
    <div className="mt-10">
      <RecordModal
        isShow={showCreateModal}
        modalType={modalType}
        onCancel={() => setShowCreateModal(false)}
        onConfirm={handelSubmitRecord}
        data={modalData}
      />
      {content}
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
          <RecordTable dataSource={dataSource} openEditModal={openEditModal} />
        </>
        : <p className='text-center text-3xl font-bold'>請 先 登 入</p>
      }
    </div>
  )
}