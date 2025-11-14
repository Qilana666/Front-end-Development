import { cn } from '@/lib/utils'
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd-mobile'
import { ReactNode } from 'react'

interface ButtonProps extends Omit<AntButtonProps, 'color' | 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'small' | 'middle' | 'large'
  children: ReactNode
  className?: string
}

export function Button({ 
  variant = 'primary', 
  size = 'middle',
  children, 
  className,
  ...props 
}: ButtonProps) {
  const baseClasses = 'rounded-full font-medium transition-all duration-200'
  
  const variantClasses = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-secondary-500 text-white hover:bg-secondary-600 active:bg-secondary-700 shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-50 active:bg-primary-100',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100'
  }
  
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    middle: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  }
  
  return (
    <AntButton
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {children}
    </AntButton>
  )
}