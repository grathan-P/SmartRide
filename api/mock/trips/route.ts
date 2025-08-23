import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const bookingData = await request.json()

  // Mock booking response
  const mockResponse = {
    success: true,
    bookingId: `TRP-${Date.now()}`,
    message: "Trip booking submitted successfully",
    estimatedResponse: "24 hours",
    contactInfo: {
      phone: "+91-9876543210",
      email: "bookings@smartride.com",
    },
    booking: bookingData,
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  return NextResponse.json(mockResponse)
}
