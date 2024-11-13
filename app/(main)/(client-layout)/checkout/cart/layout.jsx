import { siteTitle } from '@/utils'

export const metadata = {
  title: `Shopping Cart-${siteTitle}`,
}

export default function Layout({ children }) {
  return <>{children}</>
}
