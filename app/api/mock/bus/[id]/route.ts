import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const busDetails = {
    id: params.id,
    name: `Bus ${params.id === "1" ? "Express 42" : params.id === "2" ? "Metro 15" : "City Loop"}`,
    segment: "Downtown → University District",
    etaMin: Math.floor(Math.random() * 15) + 5,
    predictedEtaMin: Math.floor(Math.random() * 15) + 5,
    confidence: Math.floor(Math.random() * 30) + 70,
    rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
    rushForecast: Array.from({ length: 12 }, () => Math.floor(Math.random() * 10) + 1),
    path: [
      { lat: 40.7128, lng: -74.006 },
      { lat: 40.7589, lng: -73.9851 },
      { lat: 40.7831, lng: -73.9712 },
    ],
    userLocation: { lat: 40.7128, lng: -74.006 },
    alternatives: [
      {
        id: "2",
        name: "Metro 15",
        etaMin: Math.floor(Math.random() * 10) + 8,
        rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      },
      {
        id: "3",
        name: "City Loop",
        etaMin: Math.floor(Math.random() * 15) + 12,
        rushLevel: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
      },
    ],
  }

  return NextResponse.json(busDetails)
}
