import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const busId = params.id

  // Mock bus detail data
  const mockBusData = {
    id: busId,
    busNumber: "Express 42",
    route: "Downtown → University",
    currentLocation: "5th Avenue Stop",
    eta: 8,
    predictedEta: 10,
    delay: 2,
    rush: "medium",
    reliability: 95,
    fare: 25,
    capacity: 45,
    currentOccupancy: 28,
    nextStops: [
      { name: "Central Plaza", eta: 3, rush: "low" },
      { name: "Market Street", eta: 5, rush: "medium" },
      { name: "University Gate", eta: 8, rush: "high" },
    ],
    alternatives: [
      {
        id: "alt-1",
        busNumber: "Metro 15",
        eta: 12,
        rush: "high",
        fare: 30,
      },
      {
        id: "alt-2",
        busNumber: "Local 23",
        eta: 18,
        rush: "low",
        fare: 20,
      },
    ],
    liveUpdates: [
      { time: "2 min ago", message: "Bus departed from Downtown Terminal" },
      { time: "5 min ago", message: "Slight delay due to traffic" },
      { time: "8 min ago", message: "Bus arrived at 3rd Street" },
    ],
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json({
    success: true,
    bus: mockBusData,
  })
}
