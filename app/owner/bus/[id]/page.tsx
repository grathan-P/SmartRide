"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, TrendingUp, Clock, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { ConfidenceChip } from "@/components/confidence-chip"
import Link from "next/link"

interface BusAnalytics {
  id: string
  name: string
  route: string
  confidence: number
  etaVariance: Array<{ time: string; actual: number; predicted: number }>
  rushTrend: Array<{ time: string; rush: number }>
  notes: string
}

export default function OwnerBusDetailsPage() {
  const params = useParams()
  const [analytics, setAnalytics] = useState<BusAnalytics | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [notes, setNotes] = useState("")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAnalytics: BusAnalytics = {
        id: params.id as string,
        name: "Express 42",
        route: "Downtown → University District",
        confidence: 87,
        etaVariance: [
          { time: "08:00", actual: 8, predicted: 7 },
          { time: "09:00", actual: 12, predicted: 10 },
          { time: "10:00", actual: 6, predicted: 8 },
          { time: "11:00", actual: 15, predicted: 12 },
          { time: "12:00", actual: 9, predicted: 9 },
          { time: "13:00", actual: 11, predicted: 10 },
          { time: "14:00", actual: 7, predicted: 8 },
        ],
        rushTrend: [
          { time: "08:00", rush: 2 },
          { time: "09:00", rush: 7 },
          { time: "10:00", rush: 4 },
          { time: "11:00", rush: 8 },
          { time: "12:00", rush: 9 },
          { time: "13:00", rush: 6 },
          { time: "14:00", rush: 3 },
        ],
        notes: "Bus performing well overall. Minor delays during peak hours due to traffic congestion on Main Street.",
      }
      setAnalytics(mockAnalytics)
      setNotes(mockAnalytics.notes)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const handleNotesChange = (value: string) => {
    setNotes(value)
    // In a real app, you'd debounce this and save to localStorage or API
    localStorage.setItem(`bus-notes-${params.id}`, value)
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

  if (!analytics) return null

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
              <Link href="/owner">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Fleet
                </Button>
              </Link>
              <div>
                <h1 className="text-xl font-bold text-white">{analytics.name}</h1>
                <p className="text-sm text-gray-400">{analytics.route}</p>
              </div>
            </div>
            <ConfidenceChip confidence={analytics.confidence} />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* ETA Variance Chart */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                ETA Variance Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.etaVariance}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      label={{
                        value: "Minutes",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fill: "#9ca3af" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      name="Predicted ETA"
                      strokeDasharray="5,5"
                    />
                    <Line type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2} name="Actual ETA" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Rush Trend Chart */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-400" />
                Rush Level Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.rushTrend}>
                    <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                    <YAxis
                      stroke="#9ca3af"
                      fontSize={12}
                      domain={[0, 10]}
                      label={{
                        value: "Rush Level",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle", fill: "#9ca3af" },
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                        color: "#ffffff",
                      }}
                    />
                    <Bar dataKey="rush" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Notes Section */}
        <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <FileText className="w-5 h-5 mr-2 text-green-400" />
                Operations Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Add notes about this bus's performance, incidents, or observations..."
                className="min-h-32 bg-slate-700/50 border-slate-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <p className="text-xs text-gray-400 mt-2">Notes are saved automatically and stored locally</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
