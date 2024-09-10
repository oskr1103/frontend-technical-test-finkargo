import { FC } from 'react'
import { ButtonProps } from './interfaces'

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  disabled = false,
  variant = 'default',
  active = false,
  className,
}) => {
  const baseStyles = `px-4 py-2 rounded gap-2 transition ${className}`
  const styles =
    variant === 'page'
      ? `border ${
          active ? 'bg-blue-400 text-white' : 'bg-white text-blue-600'
        } hover:bg-blue-100`
      : 'bg-blue-100 text-blue-600 hover:bg-blue-400'

  return (
    <button
      className={`${baseStyles} ${styles}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}

export default Button
