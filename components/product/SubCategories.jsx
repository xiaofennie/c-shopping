import Link from 'next/link'

import { ResponsiveImage, SubCategoriesSkeleton } from 'components'

const SubCategories = props => {
  //? Props
  const { childCategories, isLoading } = props

  //? Render(s)
  return (
    <section className="px-4 my-7">
      {isLoading ? (
        // <SubCategoriesSkeleton />
        <></>
      ) : childCategories && childCategories.length > 0 ? (
        <>
          <h4 className="mb-4 text-xl font-bold text-gray-800 lg:pt-4">Categories</h4>
          <div className="flex gap-3 pb-3 overflow-x-auto">
            {childCategories.map(item => (
              <Link
                key={item._id}
                href={`/products?category=${item.slug}`}
                className="text-center border-2 border-gray-100 rounded-xl relative"
              >
                <ResponsiveImage
                  dimensions="w-24 h-24 md:h-32 md:w-32 xl:w-36 xl:h-36"
                  src={item.image}
                  alt={item.name}
                />

                <div className="text-sm lg:text-base font-bold absolute bottom-0 w-full bg-gray-100 py-3 text-gray-700">
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </>
      ) : null}
    </section>
  )
}

export default SubCategories
