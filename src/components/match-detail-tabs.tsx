"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MatchOverview from "@/components/match-overview"
import MatchLineups from "@/components/match-lineups"
import { useMatchDetails } from "@/lib/hooks"

export default function MatchDetailTabs({ matchId }: { matchId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const { data, isLoading } = useMatchDetails(matchId)

  if (isLoading || !data) {
    return <div>Loading...</div>
  }

  return (
    <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
        <TabsTrigger value="overview" className="data-[state=active]:bg-[#1E40AF] data-[state=active]:text-[#F8FAFC]">
          Match Overview
        </TabsTrigger>
        <TabsTrigger value="lineups" className="data-[state=active]:bg-[#1E40AF] data-[state=active]:text-[#F8FAFC]">
          Lineups
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <MatchOverview data={data} />
      </TabsContent>

      <TabsContent value="lineups">
        <MatchLineups data={data} />
      </TabsContent>
    </Tabs>
  )
}
