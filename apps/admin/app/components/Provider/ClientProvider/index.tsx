'use client'

import { ReactNode } from 'react'
import { Provider } from 'jotai'
import QueryProvider from '@admin/components/Provider/QueryProvider'
import { ThemeProvider, App } from 'ui'
import '@ant-design/v5-patch-for-react-19'

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider>
      <App>
        <ThemeProvider>
          <QueryProvider>{children}</QueryProvider>
        </ThemeProvider>
      </App>
    </Provider>
  )
}
