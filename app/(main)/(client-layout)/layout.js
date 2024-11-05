'use client'
import { ClientLayout } from 'components'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Cookies from 'js-cookie'

export default function Layout({ children }) {
  const { replace } = useRouter()

  useEffect(() => {
    if (!Cookies.get('token')) {
      replace('/login')
    } else {
      replace('/admin')
    }
  }, [replace])

  return <>{/* <ClientLayout>{children}</ClientLayout> */}</>
}
