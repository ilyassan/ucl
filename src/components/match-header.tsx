"use client"

import { motion } from "framer-motion"
import type { Match } from "@/lib/types"

export default function MatchHeader({ match }: { match: Match }) {
  const isFinished = match.status === "FINISHED"
  const isLive = match.status === "IN_PROGRESS"

  const formatTimestamp = (timestamp: string | number | Date) => {
    const date = new Date(timestamp)
    
    const timeString = date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    const dateString = date.toLocaleDateString([], {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
    
    return `${dateString}, ${timeString}`
  }

  return (
    <div className="relative h-[30vh] min-h-[250px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/90 via-[#0F172A]/70 to-[#0F172A]/90 z-10"></div>
      <div className="absolute inset-0 z-0">
      </div>

      <div className="relative z-20 container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div
            className="flex flex-col items-center md:items-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
              <img
                src={match.homeTeamLogo}
                alt={match.homeTeam}
                className="object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl mt-2 md:text-2xl font-bold text-[#F8FAFC]">{match.homeTeam}</h2>
          </motion.div>

          <motion.div
            className="flex flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className={`px-6 py-3 rounded-xl ${isLive ? "bg-red-500/20 text-red-400" : "bg-[#1E293B] text-[#F8FAFC]"} font-bold text-3xl md:text-4xl mb-2`}
            >
              {match.score}
            </div>
            <div className="flex items-center gap-2 text-[#94A3B8]">
              {isLive ? (
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              ) : isFinished ? (
                <span>Full Time</span>
              ) : (
                <span>{formatTimestamp(match.timestamp)}</span>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col items-center md:items-end"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2">
              <img
                src={match.awayTeamLogo}
                alt={match.awayTeam}
                className="object-cover rounded-full"
              />
            </div>
            <h2 className="text-xl mt-2 md:text-2xl font-bold text-[#F8FAFC]">{match.awayTeam}</h2>
          </motion.div>
        </div>
      </div>
    </div>
  )
}