import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-black flex flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-[120px] text-brand-gold-border font-light leading-none mb-4">404</p>
      <h1 className="font-display text-[32px] text-white font-light mb-3">Page Not Found</h1>
      <p className="text-body text-brand-text-muted mb-8 max-w-sm">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/">
        <Button variant="primary" size="md">Back to Home</Button>
      </Link>
    </div>
  )
}
