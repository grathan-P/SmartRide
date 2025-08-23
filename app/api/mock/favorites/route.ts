import { NextResponse } from "next/server"

export async function GET() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const favorites = [
    {
      id: "1",
      name: "Express 42",
      route: "Downtown → University",
      etaMin: Math.floor(Math.random() * 15) + 5,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
    },
    {
      id: "2",
      name: "Metro 15",
      route: "Central → Mall",
      etaMin: Math.floor(Math.random() * 20) + 8,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
    },
    {
      id: "3",
      name: "City Loop",
      route: "Station → Airport",
      etaMin: Math.floor(Math.random() * 30) + 15,
      rush: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      reliability: Math.floor(Math.random() * 20) + 80,
    },
  ]

  return NextResponse.json(favorites)
}
