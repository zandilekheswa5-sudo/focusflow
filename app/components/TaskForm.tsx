'use client'

type TaskFormProps = {
  task: string
  setTask: (value: string) => void
  dueDate: string
  setDueDate: (value: string) => void
  priority: 'high' | 'medium' | 'low'
  setPriority: (value: 'high' | 'medium' | 'low') => void
  category: 'Learning' | 'Work' | 'Personal' | 'Health'
  setCategory: (value: 'Learning' | 'Work' | 'Personal' | 'Health') => void
  editing: boolean
  addTask: () => void
}

export default function TaskForm({
  task,
  setTask,
  dueDate,
  setDueDate,
  priority,
  setPriority,
  category,
  setCategory,
  editing,
  addTask,
}: TaskFormProps) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8 shadow-lg">
      <h2 className="text-lg font-bold text-white mb-5">
        {editing ? '✏️ Edit Task' : '➕ Add New Task'}
      </h2>

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Enter task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-purple-500/60 transition-all"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60 transition-all [color-scheme:dark]"
        />

        <div className="grid grid-cols-2 gap-3">
          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as 'high' | 'medium' | 'low')
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60 transition-all"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>

          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as 'Learning' | 'Work' | 'Personal' | 'Health'
              )
            }
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/60 transition-all"
          >
            <option value="Learning">📚 Learning</option>
            <option value="Work">💼 Work</option>
            <option value="Personal">🏠 Personal</option>
            <option value="Health">💪 Health</option>
          </select>
        </div>

        <button
          onClick={addTask}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] hover:scale-[1.01]"
        >
          {editing ? '💾 Save Changes' : '➕ Add Task'}
        </button>
      </div>
    </div>
  )
}
