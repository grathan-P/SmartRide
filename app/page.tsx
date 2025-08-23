"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpDown, Clock, MapPin, Search, Zap, Navigation, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RushBadge } from "@/components/rush-badge"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Favorite {
  id: string
  name: string
  route: string
  etaMin: number
  rush: "low" | "medium" | "high"
  reliability: number
}

interface User {
  email: string
  name: string
}

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [fromLocation, setFromLocation] = useState("")
  const [toLocation, setToLocation] = useState("")
  const [selectedTime, setSelectedTime] = useState("now")
  const [isLoading, setIsLoading] = useState(true)
  const [locationDetected, setLocationDetected] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("smartride_user")
    if (!userData) {
      router.push("/auth/login")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Check for saved location
    const savedLocation = localStorage.getItem("smartride_location")
    if (savedLocation) {
      const location = JSON.parse(savedLocation)
      // Use reverse geocoding to get address (mock implementation)
      setFromLocation("Current Location")
      setLocationDetected(true)
    }

    // Simulate loading favorites
    setTimeout(() => {
      setFavorites([
        { id: "1", name: "Express 42", route: "Downtown → University", etaMin: 8, rush: "low", reliability: 95 },
        { id: "2", name: "Metro 15", route: "Central → Mall", etaMin: 12, rush: "high", reliability: 87 },
        { id: "3", name: "City Loop", route: "Station → Airport", etaMin: 25, rush: "medium", reliability: 92 },
      ])
      setIsLoading(false)
    }, 1000)
  }, [router])

  useEffect(() => {
    const interval = setInterval(() => {
      setFavorites((prev) =>
        prev.map((fav) => ({
          ...fav,
          etaMin: Math.max(1, fav.etaMin - (Math.random() > 0.7 ? 1 : 0)),
        })),
      )
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const detectCurrentLocation = async () => {
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        })
      })

      // Store location
      localStorage.setItem(
        "smartride_location",
        JSON.stringify({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        }),
      )

      setFromLocation("Current Location")
      setLocationDetected(true)
    } catch (error) {
      console.error("Location detection failed:", error)
      // Fallback to manual entry
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("smartride_user")
    localStorage.removeItem("smartride_location")
    router.push("/auth/login")
  }

  const swapLocations = () => {
    const temp = fromLocation
    setFromLocation(toLocation)
    setToLocation(temp)
  }

  const handleSearch = () => {
    if (fromLocation && toLocation) {
      window.location.href = `/results?from=${encodeURIComponent(fromLocation)}&to=${encodeURIComponent(toLocation)}&time=${selectedTime}`
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm" />
        <div className="relative container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center space-x-3"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                >
                  <Zap className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  SmartRide
                </h1>
                <p className="text-sm text-gray-400">Welcome back, {user.name}!</p>
              </div>
            </motion.div>
            <div className="flex items-center space-x-2">
              <Link href="/trips">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  Book Trip
                </Button>
              </Link>
              <Button onClick={handleLogout} variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <LogOut className="w-4 h-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {!locationDetected && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Navigation className="w-5 h-5 text-blue-400" />
                    <div>
                      <h3 className="text-white font-medium">Enable Location for Better Results</h3>
                      <p className="text-sm text-gray-400">Get accurate ETAs and nearby bus suggestions</p>
                    </div>
                  </div>
                  <Button
                    onClick={detectCurrentLocation}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Enable GPS
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Favorites Section */}
        {locationDetected && (
          <motion.section
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-400" />
              Arriving buses towards the location
            </h2>

            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                      <CardContent className="p-4">
                        <div className="animate-pulse space-y-3">
                          <div className="h-4 bg-slate-700 rounded w-3/4" />
                          <div className="h-3 bg-slate-700 rounded w-1/2" />
                          <div className="h-8 bg-slate-700 rounded w-full" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="favorites"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
                >
                  {favorites.map((favorite, index) => (
                    <motion.div
                      key={favorite.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="group"
                    >
                      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <CardContent className="p-4 relative">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-semibold text-white group-hover:text-blue-300 transition-colors">
                                {favorite.name}
                              </h3>
                              <p className="text-sm text-gray-400">{favorite.route}</p>
                            </div>
                            {favorite.rush === "high" && <RushBadge level={favorite.rush} />}
                          </div>

                          <div className="flex items-center justify-between">
                            <motion.div
                              key={favorite.etaMin}
                              initial={{ scale: 1.2, color: "#3b82f6" }}
                              animate={{ scale: 1, color: "#ffffff" }}
                              transition={{ duration: 0.3 }}
                              className="text-2xl font-bold text-white"
                            >
                              {favorite.etaMin}m
                            </motion.div>
                            <Link href={`/bus/${favorite.id}`}>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                                Track
                              </Button>
                            </Link>
                          </div>

                          <div className="mt-2 flex items-center text-xs text-gray-400">
                            <div
                              className={`w-2 h-2 rounded-full mr-2 ${
                                favorite.reliability > 90
                                  ? "bg-green-400"
                                  : favorite.reliability > 80
                                    ? "bg-yellow-400"
                                    : "bg-red-400"
                              }`}
                            />
                            {favorite.reliability}% reliable
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.section>
        )}

        {/* Search Section */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5" />
            <CardHeader className="relative">
              <CardTitle className="text-white flex items-center">
                <Search className="w-5 h-5 mr-2 text-blue-400" />
                Find Your Bus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">From</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Enter pickup location"
                      value={fromLocation}
                      onChange={(e) => setFromLocation(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {!locationDetected && (
                      <Button
                        onClick={detectCurrentLocation}
                        size="sm"
                        variant="ghost"
                        className="absolute right-2 top-1 text-gray-400 hover:text-white p-1 h-8"
                      >
                        <Navigation className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-400">To</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Enter destination"
                      value={toLocation}
                      onChange={(e) => setToLocation(e.target.value)}
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={swapLocations}
                  className="p-2 rounded-full bg-slate-700 hover:bg-slate-600 text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </motion.button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Time</label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-700">
                      <SelectItem value="now">Leave now</SelectItem>
                      <SelectItem value="15min">In 15 minutes</SelectItem>
                      <SelectItem value="30min">In 30 minutes</SelectItem>
                      <SelectItem value="1hour">In 1 hour</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-end">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    <Button
                      onClick={handleSearch}
                      disabled={!fromLocation || !toLocation}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Find Buses
                    </Button>
                  </motion.div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </div>
    </div>
  )
}
