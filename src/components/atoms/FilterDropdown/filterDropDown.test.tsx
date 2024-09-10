import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom'
import FilterDropdown from './filterDropDown'

describe('FilterDropdown Component', () => {
  it('should render with initial selected options', () => {
    render(
      <FilterDropdown
        options={['Option 1', 'Option 2']}
        selectedOptions={['Option 1']}
        onSelectionChange={() => {}}
        label="Select Option"
      />
    )

    fireEvent.click(screen.getByText('Select Option'))

    expect(
      screen.getByText('Option 1').closest('li')!.querySelector('input')
    ).toBeChecked()
    expect(
      screen.getByText('Option 2').closest('li')!.querySelector('input')
    ).not.toBeChecked()
  })

  it('should render with initial selected options', () => {
    render(
      <FilterDropdown
        options={['Option 1', 'Option 2']}
        selectedOptions={['Option 1']}
        onSelectionChange={() => {}}
        label="Select Option"
      />
    )

    fireEvent.click(screen.getByText('Select Option'))

    expect(
      screen.getByText('Option 1').closest('li')!.querySelector('input')
    ).toBeChecked()
    expect(
      screen.getByText('Option 2').closest('li')!.querySelector('input')
    ).not.toBeChecked()
  })

  it('should handle checkbox changes correctly', () => {
    const mockOnSelectionChange = vi.fn()

    render(
      <FilterDropdown
        options={['Option 1', 'Option 2']}
        selectedOptions={['Option 1']}
        onSelectionChange={mockOnSelectionChange}
        label="Select Option"
      />
    )
    fireEvent.click(screen.getByText('Select Option'))
    fireEvent.click(
      screen.getByText('Option 1').closest('li')!.querySelector('input')!
    )

    expect(mockOnSelectionChange).toHaveBeenCalledWith([])
    fireEvent.click(
      screen.getByText('Option 2').closest('li')!.querySelector('input')!
    )
  })
})
