import axios, { AxiosInstance } from "axios";

type GetApiParams = {
  apiPath: string;
  restfulParams?: (string | number)[];
}
type ApiParams<T> = {
  apiPath: string;
  restfulParams?: (string | number)[];
  data?: T
}

type ApiResponse<T> = {
  status: number;
  message: string;
  data: T
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getApi<T>(params: GetApiParams): Promise<ApiResponse<T>> {
  const { apiPath, restfulParams } = params
  const urlParam = restfulParams?.reduce<null | string | number>((result, item) => {
    if (item) {
      result = result ? result : ''
      return result + '/' + item
    }
    return result
  }, null)
  const url = urlParam ? apiPath + urlParam : apiPath
  const response = await axiosInstance.get(url);

  return response.data;
}

export async function postApi<T, R>(params: ApiParams<T>): Promise<ApiResponse<R>> {
  const { apiPath, data } = params
  const response = await axiosInstance.post(apiPath, data);

  return response.data;
}

export async function putApi<T, R>(params: ApiParams<T>): Promise<ApiResponse<R>> {
  const { apiPath, data } = params
  const response = await axiosInstance.put(apiPath, data);

  return response.data;
}