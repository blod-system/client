import type { UploadFile } from "antd";
import { UploadChangeParam } from "antd/es/upload";

export type RecordData = {
  id?: number;
  uid: number;
  date: string | Date;
  volumeMl: number;
  reportUrl: string | null
}

export type RecordParams = Omit<RecordData, 'reportUrl'> & {
  reportUrl: UploadChangeParam<UploadFile<
    {
      data: { url: string }
    }
  >> | null
}