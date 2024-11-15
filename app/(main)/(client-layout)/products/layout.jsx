import { siteTitle } from '@/utils'

export const metadata = {
  title: `Category-${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
