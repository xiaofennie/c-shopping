import Link from 'next/link'

import { ResponsiveImage } from '@/components'

const Categories = props => {
  //? Props
  const { homePage, childCategories, color, name } = props

  //? Re-Renders
  if (childCategories.categories.length > 0 && color && name) {
    return (
      <section className="px-3">
        <h4 className="mb-3 text-xl text-center">
          <span className="text-2xl font-bold text-gray-800">Category of {name}</span>
          {/* {' - '}
          {childCategories.title} */}
        </h4>
        <div className="flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit">
          {childCategories.categories.map((item, index) => (
            <div key={index} className="text-center relative">
              <Link
                href={homePage ? `/main/${item.slug}` : `/products?category=${item.slug}`}
                className="text-center"
              >
                <ResponsiveImage
                  dimensions="w-32 h-32 lg:h-56 lg:w-56"
                  className="mx-auto mb-1"
                  imageStyles="rounded-xl"
                  src={item.image}
                  alt={item.name}
                />
                <div className=" text-sm lg:text-base font-bold absolute bottom-0 w-full bg-white/60 py-3 text-gray-700">
                  {item.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    )
  }
  return null
}

export default Categories
