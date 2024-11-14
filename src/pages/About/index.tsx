import { ExclamationCircleOutlined } from "@ant-design/icons";

export default function About() {
  return (
    <>
      <h1 className="text-3xl font-bold text-center my-4">捐 血 注 意 事 項</h1>
      <ul className="text-xl font-semibold">
        <li className="my-4 pb-3 border-b-4 border-blue-300 border-dotted">
          捐血基本條件
          <ul className="list-disc list-inside font-normal pl-3 mt-2">
            <li>捐血人必須年滿 17 歲以上，65 歲以下，且男性要在 50 公斤以上，女性則需要超過 45 公斤。</li>
            <li>每次捐血的量有所限制，有 250cc 和 500cc 兩種選擇。</li>
          </ul>
        </li>
        <li className="my-4 pb-3 border-b-4 border-blue-300 border-dotted">
          捐血量限制及間隔時間
          <ul className="list-disc list-inside font-normal pl-3 mt-2">
            <li>250 cc: 捐完之後需間隔 <strong>2</strong> 個月，才可再次捐血</li>
            <li>500 cc: 體重需滿 60公斤以上，且捐完之後需間隔 <strong>3</strong> 個月，才可再次捐血</li>
            <li>分離術血小板、分離術白血球、分離術血漿：每次間隔 <strong>2</strong> 星期</li>
            <li>女性全年捐血量應在 1000 cc 以內</li>
            <li>男性全年捐血量應在 1500 cc 以內</li>
            <li>捐分離術血漿每次以 500 cc 為限，全年捐血漿量不得超過 1200 cc</li>
          </ul>
        </li>
        <li className="my-4 pb-3 border-b-4 border-blue-300 border-dotted">
          捐血前小提醒
          <ul className="list-disc list-inside font-normal pl-3 mt-2">
            <li>200 cc: 捐完之後需間隔<strong> 2 </strong>個月，才可再次捐血</li>
            <li>500 cc: 捐完之後需間隔<strong> 3 </strong>個月，才可再次捐血</li>
          </ul>
        </li>
      </ul>
      <p className="text-red-600 mt-6 font-medium text-xl">
        <ExclamationCircleOutlined className="text-2xl  mr-2" />
        「全年」捐血量的計算方式是以捐血者的生日當作起點和終點，也就是說，從你的生日當天開始計算，到下一次生日為止的這段期間為一年。
      </p>
    </>
  )
}