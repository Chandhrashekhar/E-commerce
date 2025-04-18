import type { Product } from "@/types"
import ProductCard from "./product-card"

interface ProductListProps {
  products: Product[]
  addToCart: (product: Product) => void
}

export default function ProductList({ products, addToCart }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-lg font-medium">No products found</h3>
        <p className="text-muted-foreground">Try adjusting your search criteria</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}
    </div>
  )
}
