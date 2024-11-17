import { getApi, postApi, putApi } from "./fetch";
import type { LoginParam, SignUpParam, UpdateUserInfoParams } from "../pages/Header/types";
import { UserInfo } from "../store/userStore";


export async function login(params: LoginParam) {
  const apiParams = {
    apiPath: '/user/login',
    data: params
  }

  const response = await postApi<LoginParam, { message: string }>(apiParams)
  return response
}

export async function logout() {
  const response = await getApi<{ message: string }>({ apiPath: '/user/logout' })
  return response
}

export async function singUp(params: SignUpParam) {
  const apiParams = {
    apiPath: '/user/register',
    data: params
  }
  const response = await postApi<SignUpParam, { message: string }>(apiParams)
  return response
}

export async function updateUserInfo(params: UpdateUserInfoParams) {
  const putParams = {
    apiPath: '/user/update',
    data: params
  }
  const response = await putApi<UpdateUserInfoParams, UserInfo>(putParams)

  return response
}