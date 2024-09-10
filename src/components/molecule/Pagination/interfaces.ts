export interface PaginatorProps {
  currentPage: number
  totalPages: number
  goToPage: (page: number) => void
}