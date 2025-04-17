"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  return (
    <div className="flex justify-center items-center gap-2">
      <Button
        variant="outline"
        size="icon"
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="border-[#1E40AF] text-[#38BDF8] hover:bg-[#1E40AF]/20"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }).map((_, index) => (
          <Button
            key={index}
            variant={currentPage === index + 1 ? "default" : "outline"}
            size="icon"
            onClick={() => onPageChange(index + 1)}
            className={
              currentPage === index + 1
                ? "bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-[#F8FAFC]"
                : "border-[#1E40AF] text-[#38BDF8] hover:bg-[#1E40AF]/20"
            }
          >
            {index + 1}
          </Button>
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="border-[#1E40AF] text-[#38BDF8] hover:bg-[#1E40AF]/20"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}
