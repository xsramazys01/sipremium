import { type NextRequest, NextResponse } from "next/server"
import { DatabaseService } from "@/lib/database"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get("type")

    let paymentMethods
    if (type) {
      paymentMethods = await DatabaseService.getPaymentMethodsByType(type)
    } else {
      paymentMethods = await DatabaseService.getPaymentMethods()
    }

    // Group by type
    const groupedMethods = paymentMethods.reduce(
      (acc, method) => {
        if (!acc[method.type]) {
          acc[method.type] = []
        }
        acc[method.type].push({
          id: method.id,
          name: method.name,
          account: method.account,
          popular: method.is_popular,
        })
        return acc
      },
      {} as Record<string, any[]>,
    )

    return NextResponse.json({ paymentMethods: groupedMethods })
  } catch (error) {
    console.error("Error fetching payment methods:", error)
    return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 })
  }
}
