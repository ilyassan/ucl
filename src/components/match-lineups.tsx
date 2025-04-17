"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { MatchDetails } from "@/lib/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function MatchLineups({ data }: { data: MatchDetails }) {
  const { lineups } = data
  const [activeTeam, setActiveTeam] = useState("home")

  return (
    <div className="space-y-8">
      <Tabs defaultValue="home" value={activeTeam} onValueChange={setActiveTeam} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="home" className="data-[state=active]:bg-[#1E40AF] data-[state=active]:text-[#F8FAFC]">
            {lineups.home.teamName}
          </TabsTrigger>
          <TabsTrigger value="away" className="data-[state=active]:bg-[#1E40AF] data-[state=active]:text-[#F8FAFC]">
            {lineups.away.teamName}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <PitchView players={lineups.home.players} formation={lineups.home.formation} />
        </TabsContent>

        <TabsContent value="away">
          <PitchView players={lineups.away.players} formation={lineups.away.formation} />
        </TabsContent>
      </Tabs>

      <Card className="bg-[#1E293B] border-[#38BDF8]/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-[#F8FAFC] font-medium mb-4">Starting XI</h3>
              <div className="space-y-2">
                {(activeTeam === "home" ? lineups.home.players : lineups.away.players)
                  .filter((player) => player.role === "STARTER")
                  .map((player) => (
                    <PlayerRow key={player.id} player={player} />
                  ))}
              </div>
            </div>

            <div>
              <h3 className="text-[#F8FAFC] font-medium mb-4">Substitutes</h3>
              <div className="space-y-2">
                {(activeTeam === "home" ? lineups.home.players : lineups.away.players)
                  .filter((player) => player.role === "SUBSTITUTE")
                  .map((player) => (
                    <PlayerRow key={player.id} player={player} />
                  ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PitchView({ players, formation }: { players: any[]; formation: string }) {
  const starters = players.filter((player) => player.role === "STARTER")

  // Parse formation (e.g., "4-3-3" => [4, 3, 3])
  const formationRows = formation.split("-").map(Number)

  // Add goalkeeper to the formation
  const fullFormation = [1, ...formationRows]

  // Group players by position
  const groupedPlayers = []
  let playerIndex = 0

  for (let i = 0; i < fullFormation.length; i++) {
    const rowCount = fullFormation[i]
    const row = []

    for (let j = 0; j < rowCount; j++) {
      if (playerIndex < starters.length) {
        row.push(starters[playerIndex])
        playerIndex++
      }
    }

    groupedPlayers.push(row)
  }

  return (
    <div className="relative bg-gradient-to-b from-[#1E40AF]/20 to-[#38BDF8]/20 rounded-xl p-4 aspect-[2/3] max-w-2xl mx-auto mb-8">
      {/* Field markings */}
      <div className="absolute inset-0 flex flex-col">
        <div className="h-1/5 border-b border-[#38BDF8]/30 flex items-center justify-center">
          <div className="w-1/3 h-2/3 border border-[#38BDF8]/30 rounded-md"></div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-1/2 h-1/2 border border-[#38BDF8]/30 rounded-full"></div>
        </div>
        <div className="h-1/5 border-t border-[#38BDF8]/30 flex items-center justify-center">
          <div className="w-1/3 h-2/3 border border-[#38BDF8]/30 rounded-md"></div>
        </div>
      </div>

      {/* Players */}
      <div className="relative h-full flex flex-col justify-between">
        {groupedPlayers.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-around items-center"
            style={{ height: `${100 / groupedPlayers.length}%` }}
          >
            {row.map((player, playerIndex) => (
              <motion.div
                key={player.id}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: rowIndex * 0.1 + playerIndex * 0.05 }}
              >
                <div className="w-10 h-10 rounded-full bg-[#1E293B] flex items-center justify-center text-[#F8FAFC] font-bold text-sm mb-1">
                  {player.number}
                </div>
                <div className="text-xs text-[#F8FAFC] font-medium text-center max-w-[80px] truncate">
                  {player.name.split(" ").pop()}
                </div>
                <div className="text-[10px] text-[#94A3B8]">{player.position}</div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function PlayerRow({ player }: { player: any }) {
  return (
    <div className="flex items-center p-2 rounded-md hover:bg-[#0F172A] transition-colors">
      <div className="w-8 h-8 rounded-full bg-[#1E40AF]/20 flex items-center justify-center text-[#38BDF8] font-bold text-sm mr-3">
        {player.number}
      </div>
      <div className="flex-1">
        <div className="font-medium text-[#F8FAFC]">{player.name}</div>
        <div className="text-xs text-[#94A3B8]">{player.position}</div>
      </div>
      <div className="flex items-center gap-2">
        {player.stats.goals > 0 && (
          <Badge variant="outline" className="bg-[#1E40AF]/20 text-[#38BDF8]">
            ⚽ {player.stats.goals}
          </Badge>
        )}
        {player.stats.assists > 0 && (
          <Badge variant="outline" className="bg-[#1E40AF]/20 text-[#38BDF8]">
            👟 {player.stats.assists}
          </Badge>
        )}
        {player.stats.yellowCards > 0 && (
          <Badge variant="outline" className="bg-[#1E40AF]/20 text-yellow-400">
            🟨 {player.stats.yellowCards}
          </Badge>
        )}
        {player.stats.redCards > 0 && (
          <Badge variant="outline" className="bg-[#1E40AF]/20 text-red-500">
            🟥
          </Badge>
        )}
        <div className="flex items-center">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`w-3 h-3 ${i < Math.round(player.rating / 2) ? "text-yellow-400" : "text-gray-500"}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  )
}
