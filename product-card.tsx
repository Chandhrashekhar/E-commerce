"use client"

import Image from "next/image"
import type { Product } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

interface ProductCardProps {
  product: Product
  addToCart: (product: Product) => void
}

export default function ProductCard({ product, addToCart }: ProductCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative bg-muted">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg line-clamp-1">{product.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <div className="text-sm text-muted-foreground">SKU: {product.sku}</div>
          <div className="font-bold">${product.price.toFixed(2)}</div>
        </div>
        {product.vendor && <div className="text-sm text-muted-foreground mt-1">Vendor: {product.vendor}</div>}
        {product.type && <div className="text-sm text-muted-foreground">Type: {product.type}</div>}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={() => addToCart(product)} className="w-full" variant="default">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}
