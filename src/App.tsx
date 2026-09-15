import { useEffect, useRef, useState } from 'react'
import { CategoryNav } from '@/components/CategoryNav'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { MenuSection } from '@/components/MenuSection'
import type { MenuCategoryId } from '@/domain/menu'
import { menuRepository } from '@/lib/menu-repository'

export function App() {
  const categories = menuRepository.getCategories()
  const products = menuRepository.getProducts()
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id ?? '')
  const navigationLock = useRef<string | null>(null)
  const navigationUnlockTimer = useRef<number | null>(null)

  const selectCategory = (categoryId: MenuCategoryId) => {
    setActiveCategory(categoryId)
    navigationLock.current = categoryId

    if (navigationUnlockTimer.current !== null) {
      window.clearTimeout(navigationUnlockTimer.current)
    }

    navigationUnlockTimer.current = window.setTimeout(() => {
      navigationLock.current = null
      navigationUnlockTimer.current = null
    }, 1600)
  }

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => section !== null)

    const observer = new IntersectionObserver(
      (entries) => {
        if (navigationLock.current) return

        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) => second.intersectionRatio - first.intersectionRatio,
          )[0]

        if (visibleSection) {
          const category = categories.find(
            (item) => item.id === visibleSection.target.id,
          )
          if (category) setActiveCategory(category.id)
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.25, 0.5] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [categories])

  return (
    <div className='page-shell' id='top'>
      <Hero />
      <main id='menu'>
        <CategoryNav
          categories={categories}
          activeCategory={activeCategory}
          onSelect={selectCategory}
        />
        <div className='menu-content'>
          <p className='menu-intro'>Nuestra carta</p>
          {categories.map((category) => (
            <MenuSection
              category={category}
              key={category.id}
              products={products.filter(
                (product) => product.categoryId === category.id,
              )}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
