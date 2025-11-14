import { useState, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'medium', className, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className={cn('flex flex-col items-center justify-center space-y-2', className)}>
      <div className={cn(
        'animate-spin rounded-full border-2 border-primary-200 border-t-primary-500',
        sizeClasses[size]
      )} />
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  )
}

interface LoadingScreenProps {
  text?: string
  subtext?: string
}

export function LoadingScreen({ text = '加载中...', subtext }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center space-y-4">
        <LoadingSpinner size="large" />
        <div className="space-y-1">
          <p className="text-lg font-medium text-gray-800">{text}</p>
          {subtext && <p className="text-sm text-gray-600">{subtext}</p>}
        </div>
      </div>
    </div>
  )
}

interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({ 
  title = '出错了', 
  message = '请稍后重试', 
  onRetry, 
  className 
}: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4 p-8 text-center', className)}>
      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          重试
        </button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title?: string
  message?: string
  icon?: React.ReactNode
  className?: string
}

export function EmptyState({ 
  title = '暂无数据', 
  message = '这里还没有内容', 
  icon,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center space-y-4 p-8 text-center', className)}>
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
        {icon || (
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  )
}

interface SkeletonProps {
  className?: string
  lines?: number
}

export function Skeleton({ className, lines = 3 }: SkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gray-200 rounded animate-pulse"
          style={{
            width: i === lines - 1 ? '60%' : '100%'
          }}
        />
      ))}
    </div>
  )
}

interface ImageWithLoadingProps {
  src: string
  alt: string
  className?: string
  onLoad?: () => void
  onError?: () => void
}

export function ImageWithLoading({ src, alt, className, onLoad, onError }: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
  }, [src])

  const handleLoad = () => {
    setIsLoading(false)
    onLoad?.()
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
    onError?.()
  }

  return (
    <div className={cn('relative', className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <LoadingSpinner size="small" />
        </div>
      )}
      
      {hasError ? (
        <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn('w-full h-full object-cover', isLoading && 'opacity-0')}
        />
      )}
    </div>
  )
}