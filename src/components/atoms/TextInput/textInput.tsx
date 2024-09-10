import React from 'react'

interface TextInputProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  className?: string
}

const TextInput: React.FC<TextInputProps> = ({
  value,
  onChange,
  placeholder,
  className,
}) => {
  return (
    <input
      data-testid="text-input"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-2 border border-gray-300 rounded w-full ${className}`}
    />
  )
}

export default TextInput
