import Image from 'next/image'

export default function Logo({ height = 40, width = 130 }) {
  return (
    <div className={`h-[${height}px] w-[${width}px]`}>
      <Image src="/icons/logo-title.png" width={width} height={height} alt="Kirin" />
    </div>
  )
}
