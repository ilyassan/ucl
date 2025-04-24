'use client'

import { Suspense, useEffect, useState, use } from "react"
import { useRouter } from "next/navigation"
import MatchHeader from "@/components/match-header"
import MatchDetailTabs from "@/components/match-detail-tabs"
import MatchDetailSkeleton from "@/components/match-detail-skeleton"
import { fetchMatchById } from "@/lib/api"
import { Match } from "@/lib/types"

export default function MatchDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params promise
  const { id: matchId } = use(params)
  const [match, setMatch] = useState<Match | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadMatchData = async () => {
      try {
        const matchData = await fetchMatchById(matchId)
        
        if (!matchData) {
          router.push('/not-found')
          return
        }

        setMatch(matchData)
      } catch (error) {
        console.error('Failed to fetch match:', error)
        router.push('/not-found')
      } finally {
        setIsLoading(false)
      }
    }

    loadMatchData()
  }, [matchId, router])

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#0c1222]">
        <MatchDetailSkeleton />
      </main>
    )
  }

  if (!match) {
    return null
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#0c1222]">
      <MatchHeader match={match} />
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<MatchDetailSkeleton />}>
          <MatchDetailTabs matchId={matchId} />
        </Suspense>
      </div>
    </main>
  )
}