export type DataType = {
  id: number;
  uid: number;
  date: string;
  volumeMl: number;
  reportUrl: string | null
}

export type FormDataType = Omit<DataType, 'id'> & Partial<Pick<DataType, 'uid' | 'date' | 'volumeMl'>>