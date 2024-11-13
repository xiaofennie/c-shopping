import { Icons } from '@/components'

import StockSvg from '../svgs/stock.svg'

import { formatNumber } from 'utils'

const Depot = ({ inStock }) => {
  //? Render(s)
  if (inStock < 10 && inStock !== 0) {
    return (
      <div className="flex text-teal-400 gap-x-1">
        <StockSvg style={{ color: '#ffba73' }} />
        <span className="text-[#ffba73] px-1">Left {formatNumber(inStock)}</span>
      </div>
    )
  } else if (inStock > 10) {
    return (
      <div className="flex text-teal-400 gap-x-1">
        <StockSvg style={{ color: '#9a1c59' }} />
        <span className="text-primary px-1">In stock</span>
      </div>
    )
  } else if (inStock === 0) {
    return (
      <div className="flex text-teal-400 gap-x-1">
        <StockSvg style={{ color: 'rgb(185 28 28)' }} />
        <span className="text-red-700 px-1">Out of stock</span>
      </div>
    )
  }
}

export default Depot
