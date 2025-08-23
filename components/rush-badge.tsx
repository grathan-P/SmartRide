"use client"

import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface RushBadgeProps {
  level: "low" | "medium" | "high"
  confidence?: number
  showTooltip?: boolean
}

export function RushBadge({ level, confidence = 85, showTooltip = true }: RushBadgeProps) {
  if (level !== "high") {
    return null
  }

  const config = {
    emoji: "🔴",
    text: "High Rush",
    bgColor: "bg-red-500/20",
    textColor: "text-red-400",
    borderColor: "border-red-500/30",
    icon: AlertCircle,
    description: "Very crowded, consider alternatives",
  }

  const Icon = config.icon

  const badge = (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: Math.random() * 0.2,
      }}
      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full border ${config.bgColor} ${config.borderColor} backdrop-blur-sm`}
    >
      <motion.span
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
        }}
        className="text-sm"
      >
        {config.emoji}
      </motion.span>
      <Icon className={`w-3 h-3 ${config.textColor}`} />
      <span className={`text-xs font-medium ${config.textColor}`}>{config.text}</span>
    </motion.div>
  )

  if (!showTooltip) return badge

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{badge}</TooltipTrigger>
        <TooltipContent className="bg-slate-800 border-slate-700 text-white">
          <div className="space-y-1">
            <p className="font-medium">{config.description}</p>
            <p className="text-xs text-gray-400">{confidence}% confidence</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
