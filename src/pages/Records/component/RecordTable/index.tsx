import { Button, ConfigProvider, Table } from "antd";
import type { TableColumnsType } from "antd"
import type { RecordData } from '../../types'

type PropsType = {
  dataSource: RecordData[] | null;
  openEditModal: (value: RecordData) => void;
}

export function RecordTable({ dataSource, openEditModal }: PropsType) {
  console.log(dataSource)
  const columns: TableColumnsType<RecordData> = [
    {
      title: '捐 血 日 期',
      dataIndex: 'date',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: '捐 血 量',
      dataIndex: 'volumeMl',
      render: (volumeMl) => `${volumeMl} cc`,
    },
    {
      title: '捐 血 報 告',
      dataIndex: 'reportUrl',
      render: (reportUrl) => (
        reportUrl ? <a href={reportUrl} className="text-blue-500 hover:text-red-500" target="_blank" rel="noopener noreferrer">
          PDF
        </a> : <></>
      )
    },
    {
      title: '操 作',
      dataIndex: 'operation',
      width: 100,
      render: (_, record: RecordData) => (
        <Button
          variant="link"
          color="primary"
          onClick={() => openEditModal(record)}>
          編 輯
        </Button>
      )

    }
  ]
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: '#6b7280',
            headerColor: '#FFF',
            cellFontSize: 18,
            borderColor: '#2C2D2FFF'
          },
        },
      }}
    >
      <Table
        className="bg-gray-500"
        columns={columns}
        dataSource={dataSource || []}
        bordered
        pagination={false}
        scroll={{ y: 100 * 5 }}
        rowKey={'id'}
      />
    </ConfigProvider>
  )
}