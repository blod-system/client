import React from "react"


export type RouteConfig = {
  name: string
  path: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: any
}

export const routerMap: RouteConfig[] = [
  {
    name: '捐 血 須 知',
    path: '/',
    component: React.lazy(() => import('../pages/About/index'))
  },
  {
    name: '捐 血 地 圖',
    path: '/map',
    component: React.lazy(() => import('../pages/Map/index'))
  },
  {
    name: '捐 血 紀 錄',
    path: '/record',
    component: React.lazy(() => import('../pages/Records/index'))
  },
]