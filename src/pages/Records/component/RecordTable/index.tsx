import { Button, ConfigProvider, Table } from "antd";
import type { TableColumnsType } from "antd"
import type { DataType } from '../../types'

type PropsType = {
  dataSource: DataType[];
  openEditModal: (value: DataType) => void;
}

export function RecordTable({ dataSource, openEditModal }: PropsType) {

  const columns: TableColumnsType<DataType> = [
    {
      title: '捐 血 日 期',
      dataIndex: 'date',
    },
    {
      title: '捐 血 量',
      dataIndex: 'volumeMl',
      render: (volumeMl) => `${volumeMl} cc`,
    },
    {
      title: '捐 血 報 告',
      dataIndex: 'reportUrl',
    },
    {
      title: '操 作',
      dataIndex: 'operation',
      width: 100,
      render: (_, record: DataType) => (
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
        dataSource={dataSource}
        bordered
        pagination={false}
        scroll={{ y: 100 * 5 }}
        rowKey={'id'}
      />
    </ConfigProvider>
  )
}