import { useDeferredValue, useEffect, useRef, useState } from 'react'
import { Grid2X2, List, Search, X } from 'lucide-react'
import { CategoryNav } from '@/components/CategoryNav'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { MenuSection } from '@/components/MenuSection'
import { siteConfig } from '@/data/site'
import type { MenuCategoryId } from '@/domain/menu'
import { menuRepository } from '@/lib/menu-repository'
import { normalizeSearchText } from '@/lib/normalize-search-text'

export function App() {
  const categories = menuRepository.getCategories()
  const products = menuRepository.getProducts()
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>(
    categories[0]?.id ?? 'cocktails',
  )
  const [menuView, setMenuView] = useState<'visual' | 'reading'>('visual')
  const [searchQuery, setSearchQuery] = useState('')
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const navigationLock = useRef<string | null>(null)
  const navigationUnlockTimer = useRef<number | null>(null)

  const normalizedSearchQuery = normalizeSearchText(deferredSearchQuery.trim())
  const matchesSearch = (product: (typeof products)[number]) =>
    normalizedSearchQuery.length === 0 ||
    normalizeSearchText(
      [product.name, product.description]
        .filter((value): value is string => Boolean(value))
        .join(' '),
    ).includes(normalizedSearchQuery)
  const visibleCategories = categories.filter((category) =>
    products.some(
      (product) => product.categoryId === category.id && matchesSearch(product),
    ),
  )
  const visibleCategoryIds = visibleCategories.map((category) => category.id).join('|')
  const displayedActiveCategory = visibleCategories.some(
    (category) => category.id === activeCategory,
  )
    ? activeCategory
    : (visibleCategories[0]?.id ?? activeCategory)

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
    return () => {
      if (navigationUnlockTimer.current !== null) {
        window.clearTimeout(navigationUnlockTimer.current)
        navigationUnlockTimer.current = null
      }
      navigationLock.current = null
    }
  }, [])

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return

    const visibleIds = new Set(visibleCategoryIds.split('|'))
    const sections = categories
      .filter((category) => visibleIds.has(category.id))
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
    return () => {
      observer.disconnect()
    }
  }, [categories, visibleCategoryIds])

  return (
    <div className='page-shell' id='top'>
      <Header />
      <Hero />
      <main id='menu'>
        {visibleCategories.length > 0 ? (
          <CategoryNav
            categories={visibleCategories}
            activeCategory={displayedActiveCategory}
            onSelect={selectCategory}
          />
        ) : null}
        <div className={`menu-content menu-view-${menuView}`}>
          <div className='menu-toolbar'>
            <p className='menu-intro'>{siteConfig.menuIntro}</p>
            <label className='search-field'>
              <Search size={16} aria-hidden='true' />
              <span className='sr-only'>Buscar productos en la carta</span>
              <input
                type='search'
                value={searchQuery}
                placeholder='Buscar productos'
                onChange={(event) => setSearchQuery(event.target.value)}
              />
              {searchQuery ? (
                <button
                  type='button'
                  aria-label='Limpiar búsqueda'
                  onClick={() => setSearchQuery('')}
                >
                  <X size={15} aria-hidden='true' />
                </button>
              ) : null}
            </label>
            <div className='view-switcher' aria-label='Vista de la carta'>
              <button
                className={menuView === 'visual' ? 'is-active' : ''}
                type='button'
                aria-pressed={menuView === 'visual'}
                onClick={() => setMenuView('visual')}
              >
                <Grid2X2 size={15} aria-hidden='true' />
                Visual
              </button>
              <button
                className={menuView === 'reading' ? 'is-active' : ''}
                type='button'
                aria-pressed={menuView === 'reading'}
                onClick={() => setMenuView('reading')}
              >
                <List size={15} aria-hidden='true' />
                Lectura
              </button>
            </div>
          </div>
          {visibleCategories.length > 0 ? (
            visibleCategories.map((category) => (
              <MenuSection
                category={category}
                key={category.id}
                view={menuView}
                products={products.filter(
                  (product) =>
                    product.categoryId === category.id && matchesSearch(product),
                )}
              />
            ))
          ) : (
            <p className='search-empty' role='status'>
              No encontramos productos con “{deferredSearchQuery}”.
            </p>
          )}
        </div>
      </main>
      <Footer categories={visibleCategories} />
    </div>
  )
}
