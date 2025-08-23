"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Bell, BellOff, MapPin, TrendingUp, AlertCircle, Navigation } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { RushBadge } from "@/components/rush-badge"
import { MapMock } from "@/components/map-mock"
import { Sparkline } from "@/components/sparkline"
import { ConfidenceChip } from "@/components/confidence-chip"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

interface BusDetails {
  id: string
  name: string
  segment: string
  etaMin: number
  predictedEtaMin: number
  confidence: number
  rushLevel: "low" | "medium" | "high"
  rushForecast: number[]
  path: Array<{ lat: number; lng: number }>
  userLocation: { lat: number; lng: number }
  alternatives: Array<{
    id: string
    name: string
    etaMin: number
    rushLevel: "low" | "medium" | "high"
  }>
}

export default function BusDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [busDetails, setBusDetails] = useState<BusDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTracking, setIsTracking] = useState(false)
  const [notifyEnabled, setNotifyEnabled] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBusDetails({
        id: params.id as string,
        name: "Express 42",
        segment: "Downtown → University District",
        etaMin: 8,
        predictedEtaMin: 7,
        confidence: 87,
        rushLevel: "low",
        rushForecast: [2, 3, 5, 4, 2, 1, 3, 6, 8, 5, 3, 2],
        path: [
          { lat: 40.7128, lng: -74.006 },
          { lat: 40.7589, lng: -73.9851 },
          { lat: 40.7831, lng: -73.9712 },
        ],
        userLocation: { lat: 40.7128, lng: -74.006 },
        alternatives: [
          { id: "2", name: "Metro 15", etaMin: 12, rushLevel: "medium" },
          { id: "3", name: "City Loop", etaMin: 18, rushLevel: "low" },
        ],
      })
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleNotifyToggle = () => {
    setNotifyEnabled(!notifyEnabled)
    toast({
      title: notifyEnabled ? "Notifications disabled" : "Notifications enabled",
      description: notifyEnabled ? "You won't receive updates for this bus" : "We'll nudge you when it's close",
    })
  }

  const handleTrackLive = () => {
    setIsTracking(!isTracking)
    toast({
      title: isTracking ? "Stopped tracking" : "Now tracking live",
      description: isTracking ? "Live updates paused" : "You'll get real-time location updates",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!busDetails) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/results">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Results
              </Button>
            </Link>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Hero Card */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-2">{busDetails.name}</h1>
                  <div className="flex items-center text-gray-400 mb-3">
                    <MapPin className="w-4 h-4 mr-2" />
                    {busDetails.segment}
                  </div>
                  <RushBadge level={busDetails.rushLevel} confidence={busDetails.confidence} />
                </div>
                <div className="text-right">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <motion.span
                      key={busDetails.etaMin}
                      initial={{ scale: 1.2, color: "#3b82f6" }}
                      animate={{ scale: 1, color: "#ffffff" }}
                      className="text-4xl font-bold text-white"
                    >
                      {busDetails.etaMin}m
                    </motion.span>
                    <span className="text-lg text-gray-400">ETA</span>
                  </div>
                  <ConfidenceChip confidence={busDetails.confidence} predictedEta={busDetails.predictedEtaMin} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Map */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Navigation className="w-5 h-5 mr-2 text-blue-400" />
                Live Location
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MapMock path={busDetails.path} userLocation={busDetails.userLocation} isTracking={isTracking} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Rush Forecast */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                  Rush Forecast
                </CardTitle>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      Why rush is {busDetails.rushLevel}?
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Rush Level Explanation</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-3">
                      <p>The rush level is determined by:</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-300">
                        <li>Real-time passenger count sensors</li>
                        <li>Historical ridership patterns</li>
                        <li>Time of day and route popularity</li>
                        <li>Special events and weather conditions</li>
                      </ul>
                      <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                        <p className="text-sm">
                          <strong>Current Status:</strong> {busDetails.rushLevel} rush with {busDetails.confidence}%
                          confidence
                        </p>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Sparkline data={busDetails.rushForecast} />
            </CardContent>
          </Card>
        </motion.div>

        {/* Alternatives */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Alternative Buses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {busDetails.alternatives.map((alt, index) => (
                  <motion.div
                    key={alt.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="font-medium text-white">{alt.name}</span>
                      <RushBadge level={alt.rushLevel} showTooltip={false} />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-semibold text-white">{alt.etaMin}m</span>
                      <Link href={`/bus/${alt.id}`}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-gray-300 hover:text-white bg-transparent"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Sticky Action Bar */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-md border-t border-slate-700 p-4"
      >
        <div className="container mx-auto flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleTrackLive}
              variant={isTracking ? "default" : "outline"}
              className={
                isTracking
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700"
              }
            >
              <Navigation className="w-4 h-4 mr-2" />
              {isTracking ? "Tracking Live" : "Track Live"}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNotifyToggle}
              variant={notifyEnabled ? "default" : "outline"}
              className={
                notifyEnabled
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-slate-600 text-gray-300 hover:text-white hover:bg-slate-700"
              }
            >
              {notifyEnabled ? <Bell className="w-4 h-4 mr-2" /> : <BellOff className="w-4 h-4 mr-2" />}
              {notifyEnabled ? "Notifications On" : "Notify Me"}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
