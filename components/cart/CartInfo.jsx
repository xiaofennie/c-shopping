import { formatNumber } from 'utils'

import { Button } from 'components'

import { useAppSelector } from 'hooks'

const CartInfo = props => {
  //? Porps
  const { handleRoute, cart } = props

  //? Store
  const { totalItems, totalPrice, totalDiscount } = useAppSelector(state => state.cart)

  //? Render(s)
  return (
    <div className="px-4 py-2 mt-10 space-y-5 lg:mt-0 lg:h-fit lg:py-4 lg:min-w-96">
      {/* total cart price */}
      <div className="pb-2 border-b border-gray-200 flex justify-between">
        <span className="font-bold">Price({formatNumber(totalItems)} items)</span>
        <div className="flex-center font-bold">
          <span className="font-bold">{formatNumber(totalPrice)}</span>
          <span className="ml-1 font-bold">¥</span>
        </div>
      </div>

      {/* total cart items */}
      <div className="flex justify-between">
        <span className="font-bold">Total</span>
        <div className="flex-center">
          <span className="font-bold">{formatNumber(totalPrice - totalDiscount)}</span>
          <span className="ml-1 font-bold">¥</span>
        </div>
      </div>

      {/* <span className="inline-block w-full pb-2 border-b border-gray-200 lg:max-w-xs">
        运费是根据您的货件的地址、交货时间、重量和体积计算的
      </span> */}

      {/* total cart profit */}
      <div className="flex justify-between">
        <span className="text-red-500 font-bold">Saved amount</span>
        <div className="flex-center gap-x-1">
          <span className="text-red-500 font-bold">
            ({totalPrice ? ((totalDiscount / totalPrice) * 100).toFixed(1) : 0}%)
          </span>
          <span className="text-red-500 font-bold">{formatNumber(totalDiscount)}</span>
          <span className="ml-1 text-red-500 font-bold">¥</span>
        </div>
      </div>

      {cart && (
        <Button onClick={handleRoute} className="hidden w-full lg:block bg-primary">
          Continue
        </Button>
      )}
    </div>
  )
}

export default CartInfo
