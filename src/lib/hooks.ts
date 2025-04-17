"use client"

import { useState, useEffect } from "react"
import { fetchMatchDetails } from "@/lib/api"
import type { MatchDetails } from "@/lib/types"

export function useMatchDetails(matchId: string) {
  const [data, setData] = useState<MatchDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true)
        const details = await fetchMatchDetails(matchId)
        setData(details)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch match details"))
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [matchId])

  return { data, isLoading, error }
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener("resize", checkIsMobile)

    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [])

  return isMobile
}
