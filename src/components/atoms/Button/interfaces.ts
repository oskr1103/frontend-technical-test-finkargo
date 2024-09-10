export interface ButtonProps {
  label: string
  onClick: () => void
  disabled?: boolean
  variant?: 'default' | 'page'
  active?: boolean
  className?: string
}