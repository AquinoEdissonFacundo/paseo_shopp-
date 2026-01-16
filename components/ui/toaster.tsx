'use client'

import { useToast } from '@/hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast'
import { CheckCircle2, ShoppingCart } from 'lucide-react'

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant || 'success'} {...props}>
            <div className="flex items-start gap-3 flex-1">
              <div className="flex-shrink-0 mt-0.5">
                {variant === 'success' || !variant ? (
                  <CheckCircle2 className="h-5 w-5 text-white" />
                ) : (
                  <ShoppingCart className="h-5 w-5" />
                )}
              </div>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle className="font-bold text-base">{title}</ToastTitle>}
                {description && (
                  <ToastDescription className="text-sm opacity-95">
                    {description}
                  </ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose className="text-white/80 hover:text-white" />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
