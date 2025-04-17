"use client"

import { useEffect, useState } from "react"
import { useMatchStore } from "@/lib/store"
import MatchCard from "@/components/match-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Trophy } from "lucide-react"
import Link from "next/link"

export default function FavoritesPage() {
  const { favorites, matches } = useMatchStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const favoriteMatches = matches.filter((match) => favorites.includes(match.id))

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0F172A] to-[#0c1222]">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-[#F8FAFC] mb-8">Your Favorite Matches</h1>

        {favoriteMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favoriteMatches.map((match) => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        ) : (
          <motion.div
            className="flex flex-col items-center justify-center p-12 bg-[#1E293B] rounded-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Trophy className="w-16 h-16 text-[#38BDF8] mb-4" />
            <h2 className="text-xl font-semibold text-[#F8FAFC] mb-2">No favorites yet</h2>
            <p className="text-[#94A3B8] mb-6 text-center">
              Add matches to your favorites to keep track of the games you're most interested in.
            </p>
            <Button asChild>
              <Link href="/">Browse Matches</Link>
            </Button>
          </motion.div>
        )}
      </div>
    </main>
  )
}
