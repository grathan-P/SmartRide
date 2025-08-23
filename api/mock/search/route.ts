import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const from = searchParams.get("from")
  const to = searchParams.get("to")
  const time = searchParams.get("time")

  // Mock bus search results
  const mockResults = [
    {
      id: "direct-1",
      type: "direct",
      busNumber: "Express 42",
      route: `${from} → ${to}`,
      eta: 8,
      delay: 0,
      rush: "low",
      reliability: 95,
      fare: 25,
      stops: 5,
      nextBus: 12,
    },
    {
      id: "direct-2",
      type: "direct",
      busNumber: "Metro 15",
      route: `${from} → ${to}`,
      eta: 15,
      delay: 3,
      rush: "high",
      reliability: 87,
      fare: 30,
      stops: 8,
      nextBus: 8,
    },
    {
      id: "transfer-1",
      type: "transfer",
      totalTime: 35,
      legs: [
        {
          busNumber: "Local 23",
          from: from,
          to: "Central Hub",
          eta: 12,
          delay: 0,
          rush: "medium",
          fare: 15,
        },
        {
          busNumber: "Express 67",
          from: "Central Hub",
          to: to,
          eta: 18,
          delay: 2,
          rush: "low",
          fare: 20,
        },
      ],
      totalFare: 35,
      walkingTime: 5,
    },
  ]

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  return NextResponse.json({
    success: true,
    results: mockResults,
    searchParams: { from, to, time },
  })
}
