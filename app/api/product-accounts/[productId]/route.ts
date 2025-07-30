import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/database"

export async function GET(request: NextRequest, { params }: { params: { productId: string } }) {
  try {
    const productId = Number.parseInt(params.productId)

    // Get product account with product details
    const account = await db.get(
      `
      SELECT pa.*, p.name as product_name
      FROM product_accounts pa
      JOIN products p ON pa.product_id = p.id
      WHERE pa.product_id = ? AND pa.is_available = true
      LIMIT 1
    `,
      [productId],
    )

    if (!account) {
      return NextResponse.json({ error: "No available account for this product" }, { status: 404 })
    }

    const formattedAccount = {
      id: account.id,
      productId: account.product_id,
      productName: account.product_name,
      username: account.username,
      password: account.password,
      profileName: account.profile_name,
      loginUrl: account.login_url,
      additionalInfo: account.additional_info,
      maxDevices: account.max_devices,
      supportedDevices: JSON.parse(account.supported_devices || "[]"),
      features: JSON.parse(account.features || "[]"),
      validUntil: "30 hari dari pembelian",
    }

    return NextResponse.json({ account: formattedAccount })
  } catch (error) {
    console.error("Error fetching product account:", error)
    return NextResponse.json({ error: "Failed to fetch product account" }, { status: 500 })
  }
}
