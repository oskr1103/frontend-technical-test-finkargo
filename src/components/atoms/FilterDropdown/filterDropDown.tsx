import React, { useState } from 'react'

interface FilterDropdownProps {
  options: string[]
  selectedOptions: string[]
  onSelectionChange: (selected: string[]) => void
  label: string
  className?: string
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  selectedOptions,
  onSelectionChange,
  label,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleDropdown = () => setIsOpen(!isOpen)

  const handleCheckboxChange = (option: string) => {
    if (selectedOptions.includes(option)) {
      onSelectionChange(selectedOptions.filter((item) => item !== option))
    } else {
      onSelectionChange([...selectedOptions, option])
    }
  }

  return (
    <div className={`relative w-full ${className}`}>
      <button
        onClick={toggleDropdown}
        className="p-2 border border-gray-300 rounded bg-white flex items-center justify-between w-full"
      >
        {label}
        <span className="ml-2">▼</span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded shadow-lg w-full max-h-60 overflow-y-auto">
          <ul className="p-2">
            {options.map((option) => (
              <li key={option} className="flex items-center p-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2"
                />
                <span>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FilterDropdown
