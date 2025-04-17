import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import MatchesGrid from "@/components/matches-grid"
import MatchesGridSkeleton from "@/components/matches-grid-skeleton"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#0c1222]">
      <HeroSection />
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold text-[#F8FAFC] mb-6">Quarter-Final Matches</h2>
        <Suspense fallback={<MatchesGridSkeleton />}>
          <MatchesGrid />
        </Suspense>
      </div>
    </main>
  )
}
