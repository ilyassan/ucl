"use client"

import { useState } from "react"
import { useMatchStore } from "@/lib/store"
import MatchCard from "@/components/match-card"
import Pagination from "@/components/pagination"

export default function MatchesGrid() {
  const { matches, currentPage, actions } = useMatchStore()
  const [itemsPerPage] = useState(2)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentMatches = matches.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(matches.length / itemsPerPage)

  const handlePageChange = (page: number) => {
    actions.setPagination(page)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {currentMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  )
}
