import React from 'react'
import Button from '../../atoms/Button/Button'
import { PaginatorProps } from './interfaces'

const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  totalPages,
  goToPage,
}) => {
  const maxPageNumbersToShow = 10
  const halfMax = Math.floor(maxPageNumbersToShow / 2)

  const startPage = Math.max(currentPage - halfMax, 1)
  const endPage = Math.min(startPage + maxPageNumbersToShow - 1, totalPages)

  const adjustedStartPage = Math.max(endPage - maxPageNumbersToShow + 1, 1)

  const pageNumbers = Array.from(
    { length: endPage - adjustedStartPage + 1 },
    (_, index) => adjustedStartPage + index
  )

  return (
    <div className="flex flex-wrap justify-center items-center mt-6 space-x-2 sm:space-x-4 w-full">
      <Button
        label="&lt;"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        variant="default"
      />
      {pageNumbers.map((page) => (
        <Button
          key={page}
          label={page.toString()}
          onClick={() => goToPage(page)}
          variant="page"
          active={currentPage === page}
        />
      ))}
      <Button
        label="&gt;"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        variant="default"
      />
    </div>
  )
}

export default Paginator
