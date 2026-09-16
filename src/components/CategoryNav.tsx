import type { MenuCategory, MenuCategoryId } from '@/domain/menu'

type CategoryNavProps = {
  categories: readonly MenuCategory[]
  activeCategory: MenuCategoryId
  onSelect: (categoryId: MenuCategoryId) => void
}

export function CategoryNav({
  categories,
  activeCategory,
  onSelect,
}: CategoryNavProps) {
  return (
    <nav className='category-nav' aria-label='Categorías del menú'>
      <div className='category-nav-inner'>
        {categories.map((category) => (
          <a
            className={category.id === activeCategory ? 'is-active' : ''}
            href={`#${category.id}`}
            key={category.id}
            aria-current={category.id === activeCategory ? 'location' : undefined}
            onClick={() => onSelect(category.id)}
          >
            {category.name}
          </a>
        ))}
      </div>
    </nav>
  )
}
