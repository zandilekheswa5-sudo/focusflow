'use client'
import { useState } from 'react'

export type Task = {
  id: string
  title: string
  due_date: string | null
  priority: 'high' | 'medium' | 'low'
  status: 'todo' | 'completed'
  category: 'Learning' | 'Work' | 'Personal' | 'Health'
}

type TaskCardProps = {
  task: Task
  completeTask: (id: string) => void
  deleteTask: (id: string) => void
  editTask: (task: Task) => void
}

const categoryIcons: Record<string, string> = {
  Work: '💼',
  Learning: '📚',
  Personal: '🏠',
  Health: '💪',
}

const priorityConfig = {
  high: { label: 'High Priority', color: 'text-red-400', dot: '🔴' },
  medium: { label: 'Medium Priority', color: 'text-yellow-400', dot: '🟡' },
  low: { label: 'Low Priority', color: 'text-green-400', dot: '🟢' },
}

export default function TaskCard({
  task,
  completeTask,
  deleteTask,
  editTask,
}: TaskCardProps) {
  const [showToast, setShowToast] = useState(false)

  const priority = priorityConfig[task.priority as keyof typeof priorityConfig] ?? priorityConfig.medium

  async function handleComplete() {
    setShowToast(true)
    completeTask(task.id)
    setTimeout(() => setShowToast(false), 3000)
  }

  const borderColor =
    task.priority === 'high'
      ? 'border-red-500/40'
      : task.priority === 'medium'
      ? 'border-yellow-500/40'
      : 'border-green-500/40'

  return (
    <div className="relative">
      <div
        className={`
          bg-white/5 backdrop-blur-xl border ${borderColor}
          rounded-2xl p-5 shadow-lg
          transition-all duration-300 hover:bg-white/8 hover:-translate-y-0.5
          ${task.status === 'completed' ? 'opacity-60' : ''}
        `}
      >
        <div className="flex items-start justify-between gap-4">
          {/* Left: content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-base font-semibold text-white mb-2 ${
                task.status === 'completed' ? 'line-through text-gray-400' : ''
              }`}
            >
              {task.title}
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              {/* Category */}
              <span className="text-purple-400 font-medium">
                {categoryIcons[task.category]} {task.category}
              </span>

              {/* Priority */}
              <span className={`font-medium ${priority.color}`}>
                {priority.dot} {priority.label}
              </span>

              {/* Due date */}
              {task.due_date && (
                <span className="text-gray-400 flex items-center gap-1">
                  📅{' '}
                  {new Date(task.due_date).toLocaleDateString('en-GB')}
                </span>
              )}

              {/* Status */}
              <span
                className={
                  task.status === 'completed'
                    ? 'text-green-400'
                    : 'text-yellow-400'
                }
              >
                {task.status === 'completed' ? '✅ Completed' : '🔥 In Progress'}
              </span>
            </div>
          </div>

          {/* Right: icon buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {task.status !== 'completed' && (
              <button
                onClick={handleComplete}
                title="Complete"
                className="w-9 h-9 rounded-full bg-green-600/20 border border-green-500/30 text-green-400 hover:bg-green-600/40 hover:scale-110 transition-all duration-200 flex items-center justify-center text-sm"
              >
                ✓
              </button>
            )}
            <button
              onClick={() => editTask(task)}
              title="Edit"
              className="w-9 h-9 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600/40 hover:scale-110 transition-all duration-200 flex items-center justify-center text-sm"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              title="Delete"
              className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/30 text-red-400 hover:bg-red-600/40 hover:scale-110 transition-all duration-200 flex items-center justify-center text-sm"
            >
              🗑
            </button>
          </div>
        </div>
      </div>

      {/* Task completed toast overlay */}
      {showToast && (
        <div className="absolute inset-0 flex items-center justify-center z-10 rounded-2xl bg-black/40 backdrop-blur-sm">
          <div className="bg-gray-900 border border-green-500/40 rounded-2xl px-6 py-4 flex items-center gap-4 shadow-2xl">
            <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white text-lg">
              ✓
            </div>
            <div>
              <p className="text-white font-semibold text-sm">Task Completed! 🎉</p>
              <p className="text-gray-400 text-xs mt-0.5">Great job! You're making progress.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
