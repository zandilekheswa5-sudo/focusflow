'use client'

type StatisticsProps = {
  totalTasks: number
  completedTasks: number
  remainingTasks: number
  progress: number
  dueThisWeek: number
}

export default function Statistics({
  totalTasks,
  completedTasks,
  remainingTasks,
  progress,
  dueThisWeek,
}: StatisticsProps) {
  const cards = [
    {
      icon: '📋',
      label: 'Total Tasks',
      value: totalTasks,
      sub: 'All tasks created',
      gradient: 'from-purple-700/60 to-purple-900/40',
      border: 'border-purple-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]',
    },
    {
      icon: '✅',
      label: 'Completed',
      value: completedTasks,
      sub: 'Tasks completed',
      gradient: 'from-green-700/60 to-green-900/40',
      border: 'border-green-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.35)]',
    },
    {
      icon: '⏳',
      label: 'Remaining',
      value: remainingTasks,
      sub: 'Tasks remaining',
      gradient: 'from-orange-700/60 to-orange-900/40',
      border: 'border-orange-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(249,115,22,0.35)]',
    },
    {
      icon: '📈',
      label: 'Progress',
      value: `${progress}%`,
      sub: 'Overall progress',
      gradient: 'from-indigo-700/60 to-indigo-900/40',
      border: 'border-indigo-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(99,102,241,0.35)]',
      showBar: true,
      progress,
    },
    {
      icon: '📅',
      label: 'Due This Week',
      value: dueThisWeek,
      sub: 'Tasks due this week',
      gradient: 'from-blue-700/60 to-blue-900/40',
      border: 'border-blue-500/30',
      glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.35)]',
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`
            bg-gradient-to-br ${card.gradient}
            backdrop-blur-xl border ${card.border}
            rounded-2xl p-5 flex flex-col gap-1
            shadow-lg transition-all duration-300
            hover:scale-[1.03] hover:-translate-y-1 ${card.glow}
          `}
        >
          <div className="flex items-center gap-2 text-white/70 text-sm mb-1">
            <span className="text-lg">{card.icon}</span>
            <span className="font-medium">{card.label}</span>
          </div>
          <div className="text-4xl font-bold text-white tracking-tight">
            {card.value}
          </div>
          <div className="text-xs text-white/40 mt-1">{card.sub}</div>
          {card.showBar && (
            <div className="w-full h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-400 to-indigo-400 transition-all duration-500"
                style={{ width: `${card.progress}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
