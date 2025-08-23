import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const time = searchParams.get("time")

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const buses = [
    {
      id: "1",
      name: "Express 42",
      route: `${from} → ${to}`,
      etaMin: Math.floor(Math.random() * 10) + 5,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
      segment: "Direct route via Main St",
    },
    {
      id: "2",
      name: "Metro 15",
      route: `${from} → ${to}`,
      etaMin: Math.floor(Math.random() * 15) + 8,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
      segment: "Express route via Highway",
    },
    {
      id: "3",
      name: "City Loop",
      route: `${from} → ${to}`,
      etaMin: Math.floor(Math.random() * 20) + 12,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
      segment: "Scenic route via Downtown",
    },
  ]

  return NextResponse.json(buses)
}
