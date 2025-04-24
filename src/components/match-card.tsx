"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Star, Clock } from "lucide-react"
import { useMatchStore } from "@/lib/store"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Match } from "@/lib/types"

export default function MatchCard({ match }: { match: Match }) {
  const { favorites, actions } = useMatchStore()
  const isFavorite = favorites.includes(match.id)

  const [isHovered, setIsHovered] = useState(false)

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    actions.toggleFavorite(match.id)
  }

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
    <motion.div
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-[#1E293B] rounded-xl overflow-hidden shadow-lg"
    >
      <Link href={`/match/${match.id}`} className="block">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <Badge variant="outline" className="bg-[#1E40AF]/20 text-[#38BDF8] border-[#1E40AF]">
              Quarter-Final
            </Badge>
            <MatchStatusIndicator status={match.status} />
          </div>

          <div className="flex justify-between items-center">
            <TeamBadge team={match.homeTeam} logo={match.homeTeamLogo} />
            <ScorePill score={match.score} status={match.status} />
            <TeamBadge team={match.awayTeam} logo={match.awayTeamLogo} isAway />
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center text-[#94A3B8] text-sm">
              <Clock className="w-4 h-4 mr-1" />
              <span>{formatTimestamp(match.timestamp)}</span>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className={`${isFavorite ? "text-yellow-400" : "text-[#94A3B8]"} hover:text-yellow-400 hover:bg-transparent`}
              onClick={toggleFavorite}
            >
              <Star className="w-5 h-5" />
              <span className="sr-only">{isFavorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
          </div>
        </div>

        <motion.div
          className="bg-[#1E40AF] text-[#F8FAFC] py-2 px-4 text-center text-sm font-medium"
          initial={{ y: 40 }}
          animate={{ y: isHovered ? 0 : 40 }}
          transition={{ duration: 0.3 }}
        >
          View Match Details
        </motion.div>
      </Link>
    </motion.div>
  )
}

function TeamBadge({ team, logo, isAway = false }: { team: string; logo: string; isAway?: boolean }) {
  return (
    <div className={`flex items-center gap-3 ${isAway ? "flex-row-reverse" : ""}`}>
      <div className="relative w-12 h-12 bg-[#0F172A] rounded-full overflow-hidden">
        <img
          src={logo}
          alt={team}
          className="object-cover"
        />
      </div>
      <span className="font-semibold text-[#F8FAFC]">{team}</span>
    </div>
  )
}

function ScorePill({ score, status }: { score: string; status: string }) {
  const isLive = status === "LIVE"

  return (
    <div
      className={`px-4 py-2 rounded-full ${isLive ? "bg-red-500/20 text-red-400" : "bg-[#0F172A] text-[#F8FAFC]"} font-bold text-xl`}
    >
      {score}
    </div>
  )
}

function MatchStatusIndicator({ status }: { status: string }) {
  let color = "bg-[#94A3B8]"
  const text = status

  switch (status) {
    case "LIVE":
      color = "bg-red-500"
      break
    case "FINISHED":
      color = "bg-green-500"
      break
    case "SCHEDULED":
      color = "bg-[#38BDF8]"
      break
    default:
      color = "bg-[#94A3B8]"
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-sm text-[#94A3B8]">{text}</span>
    </div>
  )
}
