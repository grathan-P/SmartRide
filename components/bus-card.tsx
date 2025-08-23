"use client"

import { motion } from "framer-motion"
import { Clock, MapPin, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RushBadge } from "@/components/rush-badge"
import Link from "next/link"

interface BusCardProps {
  bus: {
    id: string
    name: string
    route: string
    etaMin: number
    rushLevel: "low" | "medium" | "high"
    reliability: number
    segment: string
  }
}

export function BusCard({ bus }: BusCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group"
    >
      <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <CardContent className="p-6 relative">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {bus.name}
                </h3>
                <RushBadge level={bus.rushLevel} />
              </div>
              <div className="flex items-center text-gray-400 text-sm mb-1">
                <MapPin className="w-4 h-4 mr-1" />
                {bus.route}
              </div>
              <p className="text-gray-500 text-sm">{bus.segment}</p>
            </div>

            <div className="text-right">
              <motion.div
                key={bus.etaMin}
                initial={{ scale: 1.1, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-bold text-white mb-1"
              >
                {bus.etaMin}m
              </motion.div>
              <div className="text-xs text-gray-400">ETA</div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-xs text-gray-400">
                <TrendingUp className="w-3 h-3 mr-1" />
                <span
                  className={`${
                    bus.reliability > 90 ? "text-green-400" : bus.reliability > 80 ? "text-yellow-400" : "text-red-400"
                  }`}
                >
                  {bus.reliability}% reliable
                </span>
              </div>
              <div className="flex items-center text-xs text-gray-400">
                <Clock className="w-3 h-3 mr-1" />
                Live tracking
              </div>
            </div>

            <Link href={`/bus/${bus.id}`}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  View Details
                </Button>
              </motion.div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
