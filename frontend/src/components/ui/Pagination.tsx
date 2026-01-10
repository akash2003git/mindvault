import { Button } from "./Button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  page: number;
  totalPages: number;
  handlePrev: () => void;
  handleNext: () => void;
}

const Pagination = ({ page, totalPages, handlePrev, handleNext }: PaginationProps) => {
  return (
    <div className="text-md bg-white flex items-center justify-center gap-3 p-10 md:pb-10">
      <Button variant="primary" size="sm" startIcon={ChevronLeft} onClick={handlePrev}></Button>
      <span>Page <strong>{page}</strong> of <strong>{totalPages}</strong></span>
      <Button variant="primary" size="sm" startIcon={ChevronRight} onClick={handleNext}></Button>
    </div>
  )
}

export default Pagination
