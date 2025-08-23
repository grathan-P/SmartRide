"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Calendar, MapPin, Users, DollarSign, Bus, CheckCircle, Clock, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"

interface TripBooking {
  id?: string
  busType: string
  members: string
  startDate: string
  endDate: string
  destinations: string
  budget: string
  pickup: string
  dropoff: string
  specialRequests: string
  bookedAt?: string
}

export default function TripsPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookedTrips, setBookedTrips] = useState<TripBooking[]>([])
  const [activeTab, setActiveTab] = useState<"book" | "booked">("book")
  const [booking, setBooking] = useState<TripBooking>({
    busType: "",
    members: "",
    startDate: "",
    endDate: "",
    destinations: "",
    budget: "",
    pickup: "",
    dropoff: "",
    specialRequests: "",
  })

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setTimeout(() => {
      const newBooking = {
        ...booking,
        id: Date.now().toString(),
        bookedAt: new Date().toLocaleDateString(),
      }
      setBookedTrips((prev) => [newBooking, ...prev])
      setIsSubmitted(true)
      setTimeout(() => {
        setIsSubmitted(false)
        setCurrentStep(1)
        setBooking({
          busType: "",
          members: "",
          startDate: "",
          endDate: "",
          destinations: "",
          budget: "",
          pickup: "",
          dropoff: "",
          specialRequests: "",
        })
        setActiveTab("booked")
      }, 2000)
    }, 1500)
  }

  const updateBooking = (field: keyof TripBooking, value: string) => {
    setBooking((prev) => ({ ...prev, [field]: value }))
  }

  const deleteBookedTrip = (id: string) => {
    setBookedTrips((prev) => prev.filter((trip) => trip.id !== id))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-4">Booking Submitted!</h1>
            <p className="text-gray-400 mb-8">Trip added to your booked section. Redirecting...</p>

            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm text-left">
              <CardHeader>
                <CardTitle className="text-white">Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Bus Type:</span>
                    <p className="text-white font-medium">{booking.busType}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Members:</span>
                    <p className="text-white font-medium">{booking.members}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Duration:</span>
                    <p className="text-white font-medium">
                      {booking.startDate} to {booking.endDate}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Budget:</span>
                    <p className="text-white font-medium">₹{booking.budget}</p>
                  </div>
                </div>
                <div>
                  <span className="text-gray-400">Destinations:</span>
                  <p className="text-white font-medium">{booking.destinations}</p>
                </div>
                <div>
                  <span className="text-gray-400">Route:</span>
                  <p className="text-white font-medium">
                    {booking.pickup} → {booking.dropoff}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-white">Trip Management</h1>
                <p className="text-gray-400">Book trips & manage your bookings</p>
              </div>
            </div>
            <div className="flex bg-slate-800/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("book")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "book" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Book Trip
              </button>
              <button
                onClick={() => setActiveTab("booked")}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "booked" ? "bg-blue-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                Booked ({bookedTrips.length})
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {activeTab === "book" ? (
          <div className="max-w-2xl mx-auto">
            {/* Progress Bar */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <motion.div
                      animate={{
                        backgroundColor: currentStep >= step ? "#3b82f6" : "#374151",
                        scale: currentStep === step ? 1.1 : 1,
                      }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
                    >
                      {step}
                    </motion.div>
                    {step < 3 && (
                      <motion.div
                        animate={{
                          backgroundColor: currentStep > step ? "#3b82f6" : "#374151",
                        }}
                        className="w-16 h-1 mx-2"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Trip Details</span>
                <span>Preferences</span>
                <span>Review</span>
              </div>
            </motion.div>

            <AnimatePresence mode="wait">
              {/* Step 1: Trip Details */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-blue-400" />
                        Trip Details
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Bus Type</Label>
                          <Select value={booking.busType} onValueChange={(value) => updateBooking("busType", value)}>
                            <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                              <SelectValue placeholder="Select bus type" />
                            </SelectTrigger>
                            <SelectContent className="bg-slate-800 border-slate-700">
                              <SelectItem value="local">Local Bus</SelectItem>
                              <SelectItem value="luxury">Luxury Coach</SelectItem>
                              <SelectItem value="mini">Mini Bus</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">Number of Members</Label>
                          <div className="relative">
                            <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                            <Input
                              type="number"
                              placeholder="e.g., 25"
                              value={booking.members}
                              onChange={(e) => updateBooking("members", e.target.value)}
                              className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-300">Start Date</Label>
                          <Input
                            type="date"
                            value={booking.startDate}
                            onChange={(e) => updateBooking("startDate", e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label className="text-gray-300">End Date</Label>
                          <Input
                            type="date"
                            value={booking.endDate}
                            onChange={(e) => updateBooking("endDate", e.target.value)}
                            className="bg-slate-700/50 border-slate-600 text-white"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Destinations to Visit</Label>
                        <Textarea
                          placeholder="List the places you want to visit..."
                          value={booking.destinations}
                          onChange={(e) => updateBooking("destinations", e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 2: Preferences */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Bus className="w-5 h-5 mr-2 text-blue-400" />
                        Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-gray-300">Budget (₹)</Label>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            type="number"
                            placeholder="e.g., 50000"
                            value={booking.budget}
                            onChange={(e) => updateBooking("budget", e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Pickup Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Enter pickup address"
                            value={booking.pickup}
                            onChange={(e) => updateBooking("pickup", e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Drop-off Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <Input
                            placeholder="Enter drop-off address"
                            value={booking.dropoff}
                            onChange={(e) => updateBooking("dropoff", e.target.value)}
                            className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-300">Special Requests (Optional)</Label>
                        <Textarea
                          placeholder="Any special requirements or requests..."
                          value={booking.specialRequests}
                          onChange={(e) => updateBooking("specialRequests", e.target.value)}
                          className="bg-slate-700/50 border-slate-600 text-white placeholder-gray-400"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Step 3: Review */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -50, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
                        Review Booking
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-gray-400 text-sm">Bus Type</h3>
                            <p className="text-white font-medium">{booking.busType || "Not specified"}</p>
                          </div>
                          <div>
                            <h3 className="text-gray-400 text-sm">Members</h3>
                            <p className="text-white font-medium">{booking.members || "Not specified"}</p>
                          </div>
                          <div>
                            <h3 className="text-gray-400 text-sm">Budget</h3>
                            <p className="text-white font-medium">₹{booking.budget || "Not specified"}</p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h3 className="text-gray-400 text-sm">Duration</h3>
                            <p className="text-white font-medium">
                              {booking.startDate && booking.endDate
                                ? `${booking.startDate} to ${booking.endDate}`
                                : "Not specified"}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-gray-400 text-sm">Route</h3>
                            <p className="text-white font-medium">
                              {booking.pickup && booking.dropoff
                                ? `${booking.pickup} → ${booking.dropoff}`
                                : "Not specified"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-gray-400 text-sm mb-2">Destinations</h3>
                        <p className="text-white font-medium">{booking.destinations || "Not specified"}</p>
                      </div>

                      {booking.specialRequests && (
                        <div>
                          <h3 className="text-gray-400 text-sm mb-2">Special Requests</h3>
                          <p className="text-white font-medium">{booking.specialRequests}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between mt-8"
            >
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 1}
                variant="outline"
                className="border-slate-600 text-gray-400 hover:text-white disabled:opacity-50 bg-transparent"
              >
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                >
                  Submit Booking
                </Button>
              )}
            </motion.div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-white mb-2">Your Booked Trips</h2>
              <p className="text-gray-400">Manage and track your trip bookings</p>
            </div>

            {bookedTrips.length === 0 ? (
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardContent className="py-16 text-center">
                  <Bus className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No trips booked yet</h3>
                  <p className="text-gray-400 mb-6">Start planning your next adventure!</p>
                  <Button
                    onClick={() => setActiveTab("book")}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Book Your First Trip
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {bookedTrips.map((trip, index) => (
                  <motion.div
                    key={trip.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="text-white flex items-center">
                            <Bus className="w-5 h-5 mr-2 text-blue-400" />
                            {trip.busType} Trip
                          </CardTitle>
                          <div className="flex items-center text-sm text-gray-400 mt-1">
                            <Clock className="w-4 h-4 mr-1" />
                            Booked on {trip.bookedAt}
                          </div>
                        </div>
                        <Button
                          onClick={() => deleteBookedTrip(trip.id!)}
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-3">
                            <div>
                              <span className="text-gray-400 text-sm">Duration</span>
                              <p className="text-white font-medium">
                                {trip.startDate} to {trip.endDate}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Members</span>
                              <p className="text-white font-medium">{trip.members} people</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-gray-400 text-sm">Route</span>
                              <p className="text-white font-medium">
                                {trip.pickup} → {trip.dropoff}
                              </p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Budget</span>
                              <p className="text-white font-medium">₹{trip.budget}</p>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <span className="text-gray-400 text-sm">Destinations</span>
                              <p className="text-white font-medium text-sm">{trip.destinations}</p>
                            </div>
                            {trip.specialRequests && (
                              <div>
                                <span className="text-gray-400 text-sm">Special Requests</span>
                                <p className="text-white font-medium text-sm">{trip.specialRequests}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  )
}
