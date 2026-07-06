'use client'

type AnalyticsProps = {
  highPriorityTasks: number
  mediumPriorityTasks: number
  lowPriorityTasks: number
  overdueTasks: number
}

export default function Analytics({
  highPriorityTasks,
  mediumPriorityTasks,
  lowPriorityTasks,
}: AnalyticsProps) {
  const cards = [
    {
      label: 'High Priority',
      dot: '🔴',
      value: highPriorityTasks,
      gradient: 'from-red-800/60 to-red-900/40',
      border: 'border-red-500/30',
      glow: 'hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]',
    },
    {
      label: 'Medium Priority',
      dot: '🟡',
      value: mediumPriorityTasks,
      gradient: 'from-yellow-700/50 to-yellow-900/40',
      border: 'border-yellow-500/30',
      glow: 'hover:shadow-[0_0_25px_rgba(234,179,8,0.35)]',
    },
    {
      label: 'Low Priority',
      dot: '🟢',
      value: lowPriorityTasks,
      gradient: 'from-green-800/60 to-green-900/40',
      border: 'border-green-500/30',
      glow: 'hover:shadow-[0_0_25px_rgba(34,197,94,0.35)]',
    },
  ]

  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        📊 Priority Breakdown
      </h2>
      {/* 1 col phone → 3 col tablet+ */}
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className={`
              bg-gradient-to-br ${card.gradient}
              backdrop-blur-xl border ${card.border}
              rounded-2xl p-3 md:p-5 text-center
              shadow-lg transition-all duration-300
              hover:scale-[1.03] hover:-translate-y-1 ${card.glow}
            `}
          >
            <p className="text-xs md:text-sm font-medium mb-1 md:mb-2 text-white/80">
              {card.dot} {card.label}
            </p>
            <h3 className="text-2xl md:text-4xl font-bold text-white">{card.value}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}
