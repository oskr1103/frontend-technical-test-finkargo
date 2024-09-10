import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TextInput from './textInput'

describe('Input', () => {
  it('renders input and handles change event', () => {
    const handleChange = vi.fn()
    render(
      <TextInput
        placeholder="Type here"
        onChange={handleChange}
        value="value"
      />
    )

    const input = screen.getByPlaceholderText(/Type here/i)
    fireEvent.change(input, { target: { value: 'New value' } })

    expect(handleChange).toHaveBeenCalled()
  })
})
