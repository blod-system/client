import React from "react"


export type RouteConfig = {
  name: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

export const routerMap: RouteConfig[] = [
  {
    name: '關 於 我',
    path: '/',
    component: React.lazy(() => import('../component/About/index'))
  },
  {
    name: '捐 血 地 圖',
    path: '/map',
    component: React.lazy(() => import('../component/Map/index'))
  },
  {
    name: '捐 血 紀 錄',
    path: '/record',
    component: React.lazy(() => import('../component/Records/index'))
  },
]