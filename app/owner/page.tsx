"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Eye, TrendingUp, AlertTriangle, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RushBadge } from "@/components/rush-badge"
import Link from "next/link"

interface FleetBus {
  id: string
  name: string
  route: string
  area: string
  onTime: number
  rushLevel: "low" | "medium" | "high"
  incidents: number
  lastUpdated: string
}

export default function OwnerPage() {
  const [fleet, setFleet] = useState<FleetBus[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dataSource, setDataSource] = useState<"sensor" | "vision">("sensor")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFleet([
        {
          id: "1",
          name: "Express 42",
          route: "Downtown → University",
          area: "Central",
          onTime: 95,
          rushLevel: "low",
          incidents: 0,
          lastUpdated: "2 min ago",
        },
        {
          id: "2",
          name: "Metro 15",
          route: "Central → Mall",
          area: "North",
          onTime: 87,
          rushLevel: "high",
          incidents: 1,
          lastUpdated: "1 min ago",
        },
        {
          id: "3",
          name: "City Loop",
          route: "Station → Airport",
          area: "South",
          onTime: 92,
          rushLevel: "medium",
          incidents: 0,
          lastUpdated: "3 min ago",
        },
        {
          id: "4",
          name: "Night Rider",
          route: "Downtown → Suburbs",
          area: "West",
          onTime: 89,
          rushLevel: "low",
          incidents: 2,
          lastUpdated: "5 min ago",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  // Simulate data source change affecting confidence
  useEffect(() => {
    if (dataSource === "vision") {
      setFleet((prev) =>
        prev.map((bus) => ({
          ...bus,
          onTime: Math.max(70, bus.onTime - 5), // Slightly lower confidence for vision
        })),
      )
    } else {
      setFleet((prev) =>
        prev.map((bus) => ({
          ...bus,
          onTime: Math.min(98, bus.onTime + 5), // Higher confidence for sensors
        })),
      )
    }
  }, [dataSource])

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
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to App
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">Fleet Management</h1>
                <p className="text-sm text-gray-400">Monitor your bus fleet in real-time</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={dataSource} onValueChange={(value: "sensor" | "vision") => setDataSource(value)}>
                <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="sensor">Sensor Data</SelectItem>
                  <SelectItem value="vision">Vision AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Buses</p>
                  <p className="text-2xl font-bold text-white">{fleet.length}</p>
                </div>
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg On-Time</p>
                  <p className="text-2xl font-bold text-white">
                    {Math.round(fleet.reduce((acc, bus) => acc + bus.onTime, 0) / fleet.length)}%
                  </p>
                </div>
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Incidents</p>
                  <p className="text-2xl font-bold text-white">{fleet.reduce((acc, bus) => acc + bus.incidents, 0)}</p>
                </div>
                <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Data Source</p>
                  <p className="text-lg font-semibold text-white capitalize">{dataSource}</p>
                </div>
                <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Fleet Table */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white">Fleet Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="animate-pulse flex space-x-4 p-4">
                        <div className="h-4 bg-slate-700 rounded w-1/4" />
                        <div className="h-4 bg-slate-700 rounded w-1/4" />
                        <div className="h-4 bg-slate-700 rounded w-1/4" />
                        <div className="h-4 bg-slate-700 rounded w-1/4" />
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div key="table" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-slate-700">
                          <TableHead className="text-gray-400">Bus</TableHead>
                          <TableHead className="text-gray-400">Route</TableHead>
                          <TableHead className="text-gray-400">Area</TableHead>
                          <TableHead className="text-gray-400">On-Time</TableHead>
                          <TableHead className="text-gray-400">Rush</TableHead>
                          <TableHead className="text-gray-400">Incidents</TableHead>
                          <TableHead className="text-gray-400">Last Updated</TableHead>
                          <TableHead className="text-gray-400">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fleet.map((bus, index) => (
                          <motion.tr
                            key={bus.id}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="border-slate-700 hover:bg-slate-700/30 transition-colors cursor-pointer"
                            onClick={() => (window.location.href = `/owner/bus/${bus.id}`)}
                          >
                            <TableCell className="font-medium text-white">{bus.name}</TableCell>
                            <TableCell className="text-gray-300">{bus.route}</TableCell>
                            <TableCell className="text-gray-300">{bus.area}</TableCell>
                            <TableCell>
                              <span
                                className={`font-semibold ${
                                  bus.onTime >= 90
                                    ? "text-green-400"
                                    : bus.onTime >= 80
                                      ? "text-yellow-400"
                                      : "text-red-400"
                                }`}
                              >
                                {bus.onTime}%
                              </span>
                            </TableCell>
                            <TableCell>
                              <RushBadge level={bus.rushLevel} showTooltip={false} />
                            </TableCell>
                            <TableCell>
                              <span
                                className={`font-semibold ${bus.incidents === 0 ? "text-green-400" : "text-red-400"}`}
                              >
                                {bus.incidents}
                              </span>
                            </TableCell>
                            <TableCell className="text-gray-400 text-sm">{bus.lastUpdated}</TableCell>
                            <TableCell>
                              <Link href={`/owner/bus/${bus.id}`}>
                                <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </Link>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
