"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Match } from "@/lib/types"
import { fetchMatches } from "@/lib/api"

interface MatchStore {
  matches: Match[]
  favorites: string[]
  currentPage: number
  actions: {
    loadMatches: () => Promise<void>
    toggleFavorite: (matchId: string) => void
    setPagination: (page: number) => void
  }
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matches: [],
      favorites: [],
      currentPage: 1,
      actions: {
        loadMatches: async () => {
          try {
            // Only fetch if we don't have matches already
            if (get().matches.length === 0) {
              const matches = await fetchMatches()
              set({ matches })
            }
          } catch (error) {
            console.error("Failed to load matches:", error)
          }
        },
        toggleFavorite: (matchId: string) => {
          const { favorites } = get()
          const isFavorite = favorites.includes(matchId)

          if (isFavorite) {
            set({ favorites: favorites.filter((id) => id !== matchId) })
          } else {
            set({ favorites: [...favorites, matchId] })
          }
        },
        setPagination: (page: number) => {
          set({ currentPage: page })
        },
      },
    }),
    {
      name: "champions-league-store",
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
)
