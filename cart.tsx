"use client"

import Image from "next/image"
import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface CartProps {
  items: CartItem[]
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  total: number
}

export default function Cart({ items, removeFromCart, updateQuantity, total }: CartProps) {
  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-16 relative bg-muted rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm line-clamp-1">{item.title}</h4>
              <div className="text-sm text-muted-foreground">SKU: {item.sku}</div>
              <div className="text-sm font-semibold">${item.price.toFixed(2)}</div>
              <div className="flex items-center gap-2 mt-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-6 w-6"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 ml-auto text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
      <Separator />
      <CardFooter className="p-4 flex flex-col">
        <div className="flex justify-between w-full mb-4">
          <span className="font-semibold">Total:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" asChild>
          <Link href="/checkout">Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
