"use client"

import { motion } from "framer-motion"
import { MapPin, Navigation } from "lucide-react"

interface MapMockProps {
  path: Array<{ lat: number; lng: number }>
  userLocation: { lat: number; lng: number }
  isTracking?: boolean
}

export function MapMock({ path, userLocation, isTracking = false }: MapMockProps) {
  // Create SVG path from coordinates
  const pathString = path
    .map((point, index) => `${index === 0 ? "M" : "L"} ${(point.lng + 74.1) * 400} ${(40.8 - point.lat) * 400}`)
    .join(" ")

  return (
    <div className="relative w-full h-64 bg-slate-700/30 rounded-lg overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Route path */}
      <svg className="absolute inset-0 w-full h-full">
        <motion.path
          d={pathString}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeDasharray="5,5"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </svg>

      {/* User location */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="absolute"
        style={{
          left: `${(userLocation.lng + 74.1) * 400}px`,
          top: `${(40.8 - userLocation.lat) * 400}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="relative">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-lg"
          />
          <motion.div
            animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="absolute inset-0 w-4 h-4 bg-green-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Bus location (animated along path) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute"
        style={{
          left: `${(path[1].lng + 74.1) * 400}px`,
          top: `${(40.8 - path[1].lat) * 400}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          animate={
            isTracking
              ? {
                  x: [0, 20, -10, 15, 0],
                  y: [0, -15, 10, -5, 0],
                }
              : {}
          }
          transition={{
            duration: 8,
            repeat: isTracking ? Number.POSITIVE_INFINITY : 0,
            ease: "easeInOut",
          }}
          className="relative"
        >
          <div className="w-6 h-6 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg border-2 border-white">
            <Navigation className="w-3 h-3 text-white" />
          </div>
          {isTracking && (
            <motion.div
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              className="absolute inset-0 w-6 h-6 bg-blue-500 rounded-lg"
            />
          )}
        </motion.div>
      </motion.div>

      {/* Destination */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute"
        style={{
          left: `${(path[path.length - 1].lng + 74.1) * 400}px`,
          top: `${(40.8 - path[path.length - 1].lat) * 400}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
          <MapPin className="w-3 h-3 text-white" />
        </div>
      </motion.div>

      {/* Legend */}
      <div className="absolute bottom-2 left-2 bg-slate-800/80 backdrop-blur-sm rounded-lg p-2 text-xs text-white">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span>You</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span>Bus</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span>Destination</span>
          </div>
        </div>
      </div>
    </div>
  )
}
