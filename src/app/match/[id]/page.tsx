import { Suspense } from "react"
import { notFound } from "next/navigation"
import MatchHeader from "@/components/match-header"
import MatchDetailTabs from "@/components/match-detail-tabs"
import MatchDetailSkeleton from "@/components/match-detail-skeleton"
import { fetchMatchById } from "@/lib/api"

export default async function MatchDetailPage({ params }: { params: { id: string } }) {
  const matchId = params.id

  try {
    const match = await fetchMatchById(matchId)

    if (!match) {
      notFound()
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
  } catch (error) {
    notFound()
  }
}
