import { Logo, Loading } from '@/components'

export default function BigLoading() {
  return (
    <div className="p-8 mx-auto space-y-10 text-center rounded-lg bg-white max-w-max ">
      <div className="flex justify-center">
        <Logo />
      </div>
      <Loading />
    </div>
  )
}
