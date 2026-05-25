import { clsx } from 'clsx'

interface GoldDividerProps {
  className?: string
}

export default function GoldDivider({ className }: GoldDividerProps) {
  return (
    <div className={clsx('flex items-center gap-0 my-8', className)}>
      <div className="flex-1 h-px bg-brand-gold-border" />
      <div className="w-1.5 h-1.5 rotate-45 bg-brand-gold mx-2 flex-shrink-0" />
      <div className="flex-1 h-px bg-brand-gold-border" />
    </div>
  )
}
