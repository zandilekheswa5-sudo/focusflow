'use client'

type DashboardHeaderProps = {
  greeting: string
  userName: string
  completedTasks: number
  totalTasks: number
  progress: number
}

export default function DashboardHeader({
  greeting,
  userName,
  completedTasks,
  totalTasks,
  progress,
}: DashboardHeaderProps) {
  return (
    <div className="mb-8">
      {/* Greeting */}
      <p className="text-purple-300 text-lg font-semibold mb-1">
        {greeting}, {userName} 👋
      </p>
      <p className="text-gray-400 text-sm mb-6">
        Stay productive and crush your goals today.
      </p>

      {/* Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
        🚀 FocusFlow Dashboard
      </h1>

      {/* Progress row */}
      <div className="flex items-center gap-4">
        <p className="text-gray-300 text-sm whitespace-nowrap">
          {totalTasks === 0 ? (
            <>🎯 Add your first task to get started.</>
          ) : (
            <>
              🎯 You've completed{' '}
              <span className="text-purple-400 font-bold">{completedTasks}</span>{' '}
              of{' '}
              <span className="text-white font-bold">{totalTasks}</span>{' '}
              tasks today.
            </>
          )}
        </p>
        {totalTasks > 0 && (
          <>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-gray-400 text-sm font-medium whitespace-nowrap">
              {progress}%
            </span>
          </>
        )}
      </div>
    </div>
  )
}
