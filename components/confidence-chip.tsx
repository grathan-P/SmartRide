"use client"

import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConfidenceChipProps {
  confidence: number
  predictedEta?: number
}

export function ConfidenceChip({ confidence, predictedEta }: ConfidenceChipProps) {
  const getConfidenceColor = () => {
    if (confidence >= 85) return "bg-green-500/20 text-green-400 border-green-500/30"
    if (confidence >= 70) return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    return "bg-red-500/20 text-red-400 border-red-500/30"
  }

  const getIcon = () => {
    if (!predictedEta) return Minus
    if (predictedEta < 8) return TrendingDown
    if (predictedEta > 8) return TrendingUp
    return Minus
  }

  const Icon = getIcon()

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full border text-xs font-medium ${getConfidenceColor()}`}
          >
            <Icon className="w-3 h-3" />
            <span>{confidence}%</span>
            {predictedEta && <span className="text-gray-400">({predictedEta}m)</span>}
          </motion.div>
        </TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-slate-700 text-white">
          <div className="space-y-1">
            <p className="font-medium">Prediction Confidence</p>
            <p className="text-xs text-gray-400">Based on real-time traffic, historical patterns, and sensor data</p>
            {predictedEta && <p className="text-xs text-gray-400">Predicted arrival: {predictedEta} minutes</p>}
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
