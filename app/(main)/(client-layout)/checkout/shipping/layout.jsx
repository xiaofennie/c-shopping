import { siteTitle } from '@/utils'

export const metadata = {
  title: `Confirm-${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
