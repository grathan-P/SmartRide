"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Filter, SortAsc } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BusCard } from "@/components/bus-card"
import Link from "next/link"

interface BusResult {
  id: string
  name: string
  route: string
  etaMin: number
  rushLevel: "low" | "medium" | "high"
  reliability: number
  segment: string
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || ""
  const to = searchParams.get("to") || ""
  const time = searchParams.get("time") || "now"

  const [buses, setBuses] = useState<BusResult[]>([])
  const [filteredBuses, setFilteredBuses] = useState<BusResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [rushFilter, setRushFilter] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("eta")
  const [showAlternatives, setShowAlternatives] = useState(false)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockBuses: BusResult[] = [
        {
          id: "1",
          name: "Express 42",
          route: `${from} → ${to}`,
          etaMin: 8,
          rushLevel: "low",
          reliability: 95,
          segment: "Direct route via Main St",
        },
        {
          id: "2",
          name: "Metro 15",
          route: `${from} → ${to}`,
          etaMin: 12,
          rushLevel: "high",
          reliability: 87,
          segment: "Express route via Highway",
        },
        {
          id: "3",
          name: "City Loop",
          route: `${from} → ${to}`,
          etaMin: 18,
          rushLevel: "medium",
          reliability: 92,
          segment: "Scenic route via Downtown",
        },
        {
          id: "4",
          name: "Night Rider",
          route: `${from} → ${to}`,
          etaMin: 25,
          rushLevel: "low",
          reliability: 89,
          segment: "Alternative route via Park Ave",
        },
      ]
      setBuses(mockBuses)
      setIsLoading(false)
    }, 1000)
  }, [from, to])

  useEffect(() => {
    let filtered = [...buses]

    // Apply rush filter
    if (rushFilter !== "all") {
      filtered = filtered.filter((bus) => bus.rushLevel === rushFilter)
    }

    // Apply alternatives filter
    if (showAlternatives) {
      filtered = filtered.filter((bus) => bus.name.includes("Alternative") || bus.segment.includes("Alternative"))
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "eta":
          return a.etaMin - b.etaMin
        case "reliability":
          return b.reliability - a.reliability
        case "rush":
          const rushOrder = { low: 0, medium: 1, high: 2 }
          return rushOrder[a.rushLevel] - rushOrder[b.rushLevel]
        default:
          return 0
      }
    })

    setFilteredBuses(filtered)
  }, [buses, rushFilter, sortBy, showAlternatives])

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
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-lg font-semibold text-white">
                  {from} → {to}
                </h1>
                <p className="text-sm text-gray-400">{time === "now" ? "Leaving now" : `Leaving ${time}`}</p>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-6"
        >
          <Select value={rushFilter} onValueChange={setRushFilter}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Rush Level" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Rush Levels</SelectItem>
              <SelectItem value="low">Low Rush</SelectItem>
              <SelectItem value="medium">Medium Rush</SelectItem>
              <SelectItem value="high">High Rush</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-slate-800/50 border-slate-700 text-white">
              <SortAsc className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="eta">Sort by ETA</SelectItem>
              <SelectItem value="reliability">Sort by Reliability</SelectItem>
              <SelectItem value="rush">Sort by Rush Level</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={showAlternatives ? "default" : "outline"}
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="bg-slate-800/50 border-slate-700 text-white hover:bg-slate-700"
          >
            Only Alternatives
          </Button>
        </motion.div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-4">
                      <div className="flex justify-between">
                        <div className="space-y-2">
                          <div className="h-5 bg-slate-700 rounded w-32" />
                          <div className="h-4 bg-slate-700 rounded w-48" />
                        </div>
                        <div className="h-8 bg-slate-700 rounded w-20" />
                      </div>
                      <div className="h-4 bg-slate-700 rounded w-24" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : filteredBuses.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="text-6xl mb-4">🚌</div>
              <h3 className="text-xl font-semibold text-white mb-2">No buses found</h3>
              <p className="text-gray-400 mb-4">
                No buses match your current filters. Try adjusting your search criteria.
              </p>
              <Button
                onClick={() => {
                  setRushFilter("all")
                  setShowAlternatives(false)
                }}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Clear Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {filteredBuses.map((bus, index) => (
                <motion.div
                  key={bus.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <BusCard bus={bus} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  )
}
