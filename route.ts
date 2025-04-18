import { NextResponse } from "next/server"
import productsData from "@/data/products.json"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")?.toLowerCase() || ""

  // Process the data to remove empty entries and normalize
  const products = productsData
    .filter((product) => product.Title && product["Variant SKU"] && product["Variant Price"])
    .map((product) => ({
      id: product["Variant SKU"],
      title: product.Title,
      price: Number.parseFloat(product["Variant Price"].toString()),
      sku: product["Variant SKU"],
      image: product["Image Src"] || "/placeholder.svg?height=200&width=200",
      vendor: product.Vendor || "",
      type: product.Type || "",
    }))

  // Filter products if query is provided
  const filteredProducts = query
    ? products.filter(
        (product) => product.title.toLowerCase().includes(query) || product.sku.toLowerCase().includes(query),
      )
    : products

  return NextResponse.json(filteredProducts)
}
