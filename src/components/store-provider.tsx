"use client"

import { type ReactNode, useRef } from "react"
import { useMatchStore } from "@/lib/store"

export function StoreProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false)

  if (!initialized.current) {
    initialized.current = true
    useMatchStore.getState().actions.loadMatches()
  }

  return <>{children}</>
}
