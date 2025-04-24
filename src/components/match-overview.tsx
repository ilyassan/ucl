"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import Image from "next/image"
import type { MatchDetails } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy } from "lucide-react"

export default function MatchOverview({ data }: { data: MatchDetails }) {
  const { incidents, stats, lineups } = data

  // Find man of the match (highest rated player)
  const allPlayers = [...lineups.home.players, ...lineups.away.players]
  const manOfTheMatch = allPlayers.reduce(
    (highest, current) => (current.rating > highest.rating ? current : highest),
    allPlayers[0],
  )

  // Format stats for charts
  const possessionData = [
    { name: "Possession", home: stats.home.possessionPercent, away: stats.away.possessionPercent },
  ]

  const shotsData = [
    { name: "Total", home: stats.home.shots.total, away: stats.away.shots.total },
    { name: "On Target", home: stats.home.shots.onTarget, away: stats.away.shots.onTarget },
    { name: "Off Target", home: stats.home.shots.offTarget, away: stats.away.shots.offTarget },
  ]

  const radarData = [
    { subject: "Possession", home: stats.home.possessionPercent, away: stats.away.possessionPercent, fullMark: 100 },
    { subject: "Shots", home: stats.home.shots.total, away: stats.away.shots.total, fullMark: 30 },
    { subject: "Passes", home: stats.home.passes.total, away: stats.away.passes.total, fullMark: 1000 },
    { subject: "Corners", home: stats.home.corners, away: stats.away.corners, fullMark: 20 },
    { subject: "Fouls", home: stats.home.fouls, away: stats.away.fouls, fullMark: 30 },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card className="bg-[#1E293B] border-[#38BDF8]/20">
          <CardHeader>
            <CardTitle className="text-[#F8FAFC]">Match Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative pl-8 border-l border-[#38BDF8]/30">
              {incidents.map((incident, index) => (
                <motion.div
                  key={index}
                  className="mb-6 relative"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="absolute -left-[25px] w-5 h-5 rounded-full bg-[#1E40AF] flex items-center justify-center">
                    {incident.type === "GOAL" && <span className="text-xs">⚽</span>}
                    {incident.type === "YELLOW_CARD" && <span className="text-xs">🟨</span>}
                    {incident.type === "RED_CARD" && <span className="text-xs">🟥</span>}
                    {incident.type === "SUBSTITUTION" && <span className="text-xs">↔️</span>}
                  </div>

                  <div className="flex items-start">
                    <Badge variant="outline" className="mr-3 bg-[#1E40AF]/20 text-[#38BDF8]">
                      {incident.minute}'
                    </Badge>
                    <div>
                      <div className="font-medium text-[#F8FAFC]">
                        {incident.playerName} {incident.type === "GOAL" && "⚽ Goal"}
                        {incident.type === "YELLOW_CARD" && "🟨 Yellow Card"}
                        {incident.type === "RED_CARD" && "🟥 Red Card"}
                        {incident.type === "SUBSTITUTION" && "↔️ Substitution"}
                      </div>
                      <div className="text-sm text-[#94A3B8]">
                        {incident.teamName}
                        {incident.assistedBy && ` • Assisted by ${incident.assistedBy}`}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] border-[#38BDF8]/20">
          <CardHeader>
            <CardTitle className="text-[#F8FAFC]">Match Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div>
                <h3 className="text-[#F8FAFC] font-medium mb-2">Possession</h3>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={possessionData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis type="category" dataKey="name" hide />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#38BDF8" }}
                      labelStyle={{ color: "#F8FAFC" }}
                    />
                    <Legend />
                    <Bar dataKey="home" name={lineups.home.teamName} fill="#1E40AF" />
                    <Bar dataKey="away" name={lineups.away.teamName} fill="#38BDF8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-[#F8FAFC] font-medium mb-2">Shots</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={shotsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#38BDF8" }}
                      labelStyle={{ color: "#F8FAFC" }}
                    />
                    <Legend />
                    <Bar dataKey="home" name={lineups.home.teamName} fill="#1E40AF" />
                    <Bar dataKey="away" name={lineups.away.teamName} fill="#38BDF8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="text-[#F8FAFC] font-medium mb-2">Team Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart outerRadius={90} data={radarData}>
                    <PolarGrid stroke="#38BDF8" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#94A3B8" }} />
                    <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
                    <Radar
                      name={lineups.home.teamName}
                      dataKey="home"
                      stroke="#1E40AF"
                      fill="#1E40AF"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name={lineups.away.teamName}
                      dataKey="away"
                      stroke="#38BDF8"
                      fill="#38BDF8"
                      fillOpacity={0.6}
                    />
                    <Legend />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#1E293B", borderColor: "#38BDF8" }}
                      labelStyle={{ color: "#F8FAFC" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-8">
        <Card className="bg-[#1E293B] border-[#38BDF8]/20">
          <CardHeader className="bg-gradient-to-r from-[#1E40AF] to-[#38BDF8] text-[#F8FAFC]">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5" />
              <CardTitle>Man of the Match</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-[#1E40AF]">
                <img
                  src={manOfTheMatch.image}
                  alt={manOfTheMatch.name}
                  className="object-cover"
                />
              </div>

              <h3 className="text-xl font-bold text-[#F8FAFC] mb-1">{manOfTheMatch.name}</h3>
              <p className="text-[#94A3B8] mb-3">
                {manOfTheMatch.position} • {manOfTheMatch.teamName}
              </p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < Math.round(manOfTheMatch.rating / 2) ? "text-yellow-400" : "text-gray-500"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-[#F8FAFC] font-bold ml-1">{manOfTheMatch.rating.toFixed(1)}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full">
                <div className="bg-[#0F172A] p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#38BDF8]">{manOfTheMatch.stats.goals || 0}</div>
                  <div className="text-xs text-[#94A3B8]">Goals</div>
                </div>
                <div className="bg-[#0F172A] p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#38BDF8]">{manOfTheMatch.stats.assists || 0}</div>
                  <div className="text-xs text-[#94A3B8]">Assists</div>
                </div>
                <div className="bg-[#0F172A] p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#38BDF8]">{manOfTheMatch.stats.shots || 0}</div>
                  <div className="text-xs text-[#94A3B8]">Shots</div>
                </div>
                <div className="bg-[#0F172A] p-3 rounded-lg text-center">
                  <div className="text-xl font-bold text-[#38BDF8]">{manOfTheMatch.stats.passes || 0}</div>
                  <div className="text-xs text-[#94A3B8]">Passes</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1E293B] border-[#38BDF8]/20">
          <CardHeader>
            <CardTitle className="text-[#F8FAFC]">Key Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="text-right w-1/3 text-[#F8FAFC]">{stats.home.passes.total}</div>
                <div className="text-center w-1/3 text-[#94A3B8] text-sm">Passes</div>
                <div className="text-left w-1/3 text-[#F8FAFC]">{stats.away.passes.total}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-right w-1/3 text-[#F8FAFC]">{stats.home.passes.accurate}</div>
                <div className="text-center w-1/3 text-[#94A3B8] text-sm">Accurate Passes</div>
                <div className="text-left w-1/3 text-[#F8FAFC]">{stats.away.passes.accurate}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-right w-1/3 text-[#F8FAFC]">{stats.home.fouls}</div>
                <div className="text-center w-1/3 text-[#94A3B8] text-sm">Fouls</div>
                <div className="text-left w-1/3 text-[#F8FAFC]">{stats.away.fouls}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-right w-1/3 text-[#F8FAFC]">{stats.home.corners}</div>
                <div className="text-center w-1/3 text-[#94A3B8] text-sm">Corners</div>
                <div className="text-left w-1/3 text-[#F8FAFC]">{stats.away.corners}</div>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-right w-1/3 text-[#F8FAFC]">{stats.home.offsides}</div>
                <div className="text-center w-1/3 text-[#94A3B8] text-sm">Offsides</div>
                <div className="text-left w-1/3 text-[#F8FAFC]">{stats.away.offsides}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
