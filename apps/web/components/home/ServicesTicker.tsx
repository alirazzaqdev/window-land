const SERVICES = [
  'Curtain Wall Systems',
  'Aluminium Pergolas & Skylights',
  'Sliding Doors',
  'Glass Balustrade',
  'ACP Cladding',
  'Office Partitions',
  'Glass Works',
  'Shower Partitions',
  'Metal Fabrication',
  'Ventilation Windows',
  'Swing Windows',
  'Fixed Windows',
  'Frameless Glass Doors',
  'Glass Pool Fence',
  'Aluminium Louvers',
  'Mirror Works',
  'Balcony Railing',
  'Steel Fabrication',
  'Tempered Glass Works',
]

const tickerText = SERVICES.join(' · ')

export default function ServicesTicker() {
  return (
    <div className="bg-brand-gold py-4 overflow-hidden">
      <div className="flex whitespace-nowrap animate-ticker">
        <span className="text-label text-brand-black uppercase tracking-[3px] pr-8">
          {tickerText} · {tickerText}
        </span>
        <span className="text-label text-brand-black uppercase tracking-[3px] pr-8" aria-hidden>
          {tickerText} · {tickerText}
        </span>
      </div>
    </div>
  )
}
