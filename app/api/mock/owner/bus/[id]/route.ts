import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const analytics = {
    id: params.id,
    name: `Bus ${params.id === "1" ? "Express 42" : params.id === "2" ? "Metro 15" : "City Loop"}`,
    route: "Downtown → University District",
    confidence: Math.floor(Math.random() * 30) + 70,
    etaVariance: Array.from({ length: 7 }, (_, i) => ({
      time: `${8 + i}:00`,
      actual: Math.floor(Math.random() * 10) + 5,
      predicted: Math.floor(Math.random() * 10) + 5,
    })),
    rushTrend: Array.from({ length: 7 }, (_, i) => ({
      time: `${8 + i}:00`,
      rush: Math.floor(Math.random() * 8) + 2,
    })),
    notes: "Bus performing well overall. Minor delays during peak hours due to traffic congestion.",
  }

  return NextResponse.json(analytics)
}
