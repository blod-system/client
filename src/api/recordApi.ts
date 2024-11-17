import { getApi, postApi, putApi } from "./fetch";
import { RecordData } from "../pages/Records/types";

export type RecordResponse = Omit<RecordData, 'volumeMl' | 'reportUrl'> & {
  volume_ml: number;
  report_url: string | null;
  user_account: string;
}

type RecordPayload = Omit<RecordData, 'reportUrl' | 'volumeMl'> & {
  report_url: string | null;
  volume_ml: number;
  user_account: string;
}
export async function getRecords(uid: number) {
  const response = await getApi<RecordResponse[]>(
    {
      apiPath: '/record',
      restfulParams: [uid]
    }
  )
  return response
}

export async function addRecord(params: RecordPayload) {
  const response = await postApi<RecordPayload, { message: string }>(
    {
      apiPath: '/record/create',
      data: params
    }
  )
  return response
}

export async function updateRecord(params: RecordPayload) {
  const response = await putApi<RecordPayload, { message: string }>(
    {
      apiPath: '/record/update',
      data: params
    }
  )

  return response
}