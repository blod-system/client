import { getApi, postApi, putApi } from "./fetch";
import type { LoginParam, UpdateUserInfoParam } from "../pages/Header/types";

type Payload = {
  status: number;
  data?: object[];
  message?: string
}
export async function login(params: LoginParam) {
  const apiParams = {
    apiPath: '/user/login',
    data: params
  }

  const response = await postApi<LoginParam, Payload>(apiParams)
  return response
}

export async function logout() {
  const response = await getApi<Payload>({ apiPath: '/user/logout' })
  return response
}

export async function singUp(params: UpdateUserInfoParam) {
  const apiParams = {
    apiPath: '/user/register',
    data: params
  }
  const response = await postApi<UpdateUserInfoParam, Payload>(apiParams)
  return response
}

export async function updateUserInfo(params: UpdateUserInfoParam) {
  const putParams = {
    apiPath: '/user/update',
    data: params
  }
  const response = await putApi<UpdateUserInfoParam, Payload>(putParams)

  return response
}