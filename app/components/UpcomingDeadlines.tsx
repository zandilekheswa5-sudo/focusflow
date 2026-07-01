'use client'

type Task = {
  id: string
  title: string
  due_date: string | null
}

type UpcomingDeadlinesProps = {
  upcomingTasks: Task[]
}

export default function UpcomingDeadlines({
  upcomingTasks,
}: UpcomingDeadlinesProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          📅 Upcoming Deadlines
        </h2>
        <button className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium">
          View Calendar
        </button>
      </div>

      {upcomingTasks.length === 0 ? (
        <p className="text-gray-400 text-sm">No upcoming deadlines.</p>
      ) : (
        <div className="space-y-1">
          {upcomingTasks.map((task) => {
            const isOverdue =
              task.due_date && new Date(task.due_date) < new Date()

            return (
              <div
                key={task.id}
                className="flex justify-between items-center py-3 border-b border-white/5 last:border-0"
              >
                <span className="text-sm text-white/90 font-medium">
                  {task.title}
                </span>
                <span
                  className={`text-sm font-semibold flex items-center gap-1.5 ${
                    isOverdue ? 'text-red-400' : 'text-red-400'
                  }`}
                >
                  📅{' '}
                  {task.due_date
                    ? new Date(task.due_date).toLocaleDateString('en-GB')
                    : 'No date'}
                </span>
              </div>
            )
          })}
        </div>
      )}

      {upcomingTasks.length > 0 && (
        <button className="mt-4 text-xs text-gray-400 hover:text-white transition-colors flex items-center gap-1">
          View all deadlines →
        </button>
      )}
    </div>
  )
}
