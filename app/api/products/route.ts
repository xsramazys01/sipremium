import { NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET() {
  try {
    const products = await DatabaseService.getProducts()

    // Format products for frontend
    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: `Rp ${product.price.toLocaleString("id-ID")}`,
      numericPrice: product.price,
      duration: product.duration,
      category: product.category,
      image: product.image_url,
      isActive: product.is_active,
    }))

    return NextResponse.json({ products: formattedProducts })
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}
