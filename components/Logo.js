import Image from 'next/image'

export default function Logo({ height = 54, width = 160 }) {
  return (
    <div className={`h-[${height}px] w-[${width}px]`}>
      <Image src="/icons/logo.jpg" width={width} height={height} alt="Kirin" />
    </div>
  )
}
