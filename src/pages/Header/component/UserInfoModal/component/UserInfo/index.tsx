import { Button } from "antd";
import { UserInfo as UserInfoType } from "../../../../../../store/userStore"
import { EditOutlined } from "@ant-design/icons";


type PropsType = {
  userInfo: UserInfoType;
  onCancel: () => void;
  onEdit: () => void;
}


export default function UserInfo({ userInfo, onCancel, onEdit }: PropsType) {

  return (
    <>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          帳 號
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.account}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          暱 稱
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.name}
        </p>
      </div>

      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          生 日
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.birthday}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          手 機
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.phone}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          性 別
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.gender === 'women' ? '女' : '男'}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          E-mail
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.email}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          下 次 捐 血 日
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.reminderDate}
        </p>
      </div>
      <div className='flex mb-3 items-center'>
        <p className='text-right border-r-2 pr-3 mr-3 text-gray-400 font-medium w-32'>
          捐血提醒
        </p>
        <p className='w-36 md:w-60'>
          {userInfo?.isReminder === 0 ? '否' : '是'}
        </p>
      </div>

      <div className='flex justify-evenly mt-5'>
        <Button onClick={onCancel} color='default' variant='outlined'>
          關 閉
        </Button>
        <Button color='primary' variant='solid' onClick={onEdit}>
          <EditOutlined key="edit" />編 輯
        </Button>
      </div>
    </>
  )
}