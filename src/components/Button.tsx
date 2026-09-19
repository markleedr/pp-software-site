import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const base =
  'inline-flex items-center justify-center rounded px-6 py-3 text-[15px] font-semibold transition-[transform,filter] duration-150 active:scale-[0.97]'

const variants = {
  primary: 'bg-primary text-primary-foreground hover:brightness-95',
  outline: 'border border-border text-foreground hover:bg-muted',
  ghost: 'text-foreground hover:bg-muted',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

interface ButtonLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: keyof typeof variants
}

export function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}
