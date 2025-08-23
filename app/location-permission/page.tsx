"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MapPin, Navigation, Shield, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

export default function LocationPermissionPage() {
  const [isRequesting, setIsRequesting] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const router = useRouter()

  const requestLocation = async () => {
    setIsRequesting(true)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
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

      setPermissionGranted(true)
      setTimeout(() => router.push("/"), 2000)
    } catch (error) {
      console.error("Location permission denied:", error)
      // Allow manual location entry
      setTimeout(() => router.push("/"), 1000)
    } finally {
      setIsRequesting(false)
    }
  }

  const skipLocation = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />

          <CardHeader className="relative text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
              className="mx-auto mb-4"
            >
              {permissionGranted ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center"
                >
                  <Navigation className="w-8 h-8 text-white" />
                </motion.div>
              ) : (
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                  >
                    <MapPin className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full"
                  />
                </div>
              )}
            </motion.div>

            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {permissionGranted ? "Location Enabled!" : "Enable Location"}
            </CardTitle>
            <p className="text-gray-400 mt-2">
              {permissionGranted ? "Great! We can now show you nearby buses" : "Help us find the best buses near you"}
            </p>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {!permissionGranted && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-4"
                >
                  <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl">
                    <Shield className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium">Privacy Protected</h3>
                      <p className="text-sm text-gray-400">
                        Your location is only used to find nearby buses and is never shared.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-4 bg-slate-700/30 rounded-xl">
                    <Zap className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="text-white font-medium">Better Experience</h3>
                      <p className="text-sm text-gray-400">
                        Get accurate ETAs and real-time updates for buses near you.
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="space-y-3"
                >
                  <Button
                    onClick={requestLocation}
                    disabled={isRequesting}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 disabled:opacity-50"
                  >
                    {isRequesting ? (
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Requesting Location...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-5 h-5" />
                        <span>Enable Location</span>
                      </div>
                    )}
                  </Button>

                  <Button onClick={skipLocation} variant="ghost" className="w-full text-gray-400 hover:text-white">
                    Skip for now
                  </Button>
                </motion.div>
              </>
            )}

            {permissionGranted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full mx-auto mb-4"
                />
                <p className="text-gray-400">Taking you to the app...</p>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
