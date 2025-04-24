"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Match } from "@/lib/types";
import { fetchMatches } from "@/lib/api";

interface MatchStore {
  matches: Match[];
  favorites: string[];
  currentPage: number;
  actions: {
    loadMatches: () => Promise<void>;
    toggleFavorite: (matchId: string) => void;
    setPagination: (page: number) => void;
  };
}

export const useMatchStore = create<MatchStore>()(
  persist(
    (set, get) => ({
      matches: [],
      favorites: [],
      currentPage: 1,
      error: null,
      actions: {
        loadMatches: async () => {
          try {
            const matches = await fetchMatches();
            set({ matches });
          } catch (error) {
            console.error("Failed to load matches:", error);
          }
        },
        toggleFavorite: (matchId: string) => {
          const { favorites } = get();
          set({
            favorites: favorites.includes(matchId)
              ? favorites.filter((id) => id !== matchId)
              : [...new Set([...favorites, matchId])],
          });
        },
        setPagination: (page: number) => {
          set({ currentPage: page });
        },
      },
    }),
    {
      name: "champions-league-store",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ favorites: state.favorites }),
    },
  ),
);