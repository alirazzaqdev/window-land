interface TeamMember {
  initials: string
  role: string
  department: string
}

interface TeamCardProps {
  member: TeamMember
}

const deptColors: Record<string, string> = {
  Management: 'text-brand-gold border-brand-gold',
  Operations: 'text-blue-400 border-blue-400/30',
  Technical: 'text-green-400 border-green-400/30',
  Support: 'text-purple-400 border-purple-400/30',
}

export default function TeamCard({ member }: TeamCardProps) {
  const deptClass = deptColors[member.department] ?? 'text-brand-gold border-brand-gold-border'

  return (
    <div className="flex flex-col items-center text-center p-6 border border-brand-gold-border bg-brand-black-card hover:border-brand-gold transition-all duration-300 group">
      <div className="w-16 h-16 rounded-full border-2 border-brand-gold flex items-center justify-center mb-4 group-hover:bg-brand-gold-dim transition-colors duration-300">
        <span className="font-display text-[22px] text-brand-gold font-light">{member.initials}</span>
      </div>
      <h3 className="font-sans font-medium text-[14px] text-white mb-1">{member.role}</h3>
      <span
        className={`text-caption uppercase tracking-[2px] border px-2 py-0.5 ${deptClass}`}
      >
        {member.department}
      </span>
    </div>
  )
}
