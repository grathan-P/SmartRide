import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const source = searchParams.get("source") || "sensor"

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const confidenceModifier = source === "vision" ? -5 : 5

  const fleet = [
    {
      id: "1",
      name: "Express 42",
      route: "Downtown → University",
      area: "Central",
      onTime: Math.min(98, 95 + confidenceModifier),
      rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      incidents: Math.floor(Math.random() * 3),
      lastUpdated: `${Math.floor(Math.random() * 5) + 1} min ago`,
    },
    {
      id: "2",
      name: "Metro 15",
      route: "Central → Mall",
      area: "North",
      onTime: Math.max(70, 87 + confidenceModifier),
      rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      incidents: Math.floor(Math.random() * 3),
      lastUpdated: `${Math.floor(Math.random() * 5) + 1} min ago`,
    },
    {
      id: "3",
      name: "City Loop",
      route: "Station → Airport",
      area: "South",
      onTime: Math.min(98, 92 + confidenceModifier),
      rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      incidents: Math.floor(Math.random() * 3),
      lastUpdated: `${Math.floor(Math.random() * 5) + 1} min ago`,
    },
    {
      id: "4",
      name: "Night Rider",
      route: "Downtown → Suburbs",
      area: "West",
      onTime: Math.max(70, 89 + confidenceModifier),
      rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      incidents: Math.floor(Math.random() * 4),
      lastUpdated: `${Math.floor(Math.random() * 8) + 2} min ago`,
    },
  ]

  return NextResponse.json({ fleet, source })
}
