export interface Product {
  id: string
  title: string
  price: number
  sku: string
  image: string
  vendor: string
  type: string
}

export interface CartItem extends Product {
  quantity: number
}
