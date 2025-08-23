"use client"

import { motion } from "framer-motion"
import { LineChart, Line, ResponsiveContainer, YAxis } from "recharts"

interface SparklineProps {
  data: number[]
}

export function Sparkline({ data }: SparklineProps) {
  const chartData = data.map((value, index) => ({
    index,
    value,
    time: `${8 + index}:00`,
  }))

  const maxValue = Math.max(...data)
  const getColor = (value: number) => {
    if (value <= maxValue * 0.3) return "#10b981" // green
    if (value <= maxValue * 0.7) return "#f59e0b" // yellow
    return "#ef4444" // red
  }

  return (
    <div className="space-y-4">
      <div className="h-24">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <YAxis hide domain={[0, maxValue]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#3b82f6" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-400">Next 12 hours</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-gray-400">Low</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-yellow-500 rounded-full" />
            <span className="text-gray-400">Medium</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-red-500 rounded-full" />
            <span className="text-gray-400">High</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-6 gap-2">
        {data.slice(0, 6).map((value, index) => (
          <motion.div
            key={index}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${(value / maxValue) * 40}px`, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div
              className="w-full rounded-t-sm mb-1"
              style={{
                backgroundColor: getColor(value),
                height: `${(value / maxValue) * 40}px`,
              }}
            />
            <span className="text-xs text-gray-400">{8 + index}:00</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
