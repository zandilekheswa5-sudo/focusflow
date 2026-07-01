'use client'

type TopNavbarProps = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filter: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low'
  setFilter: (value: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low') => void
  onAddTask: () => void
}

export default function TopNavbar({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  onAddTask,
}: TopNavbarProps) {
  return (
    <header className="fixed top-0 left-56 right-0 h-16 bg-[#0d0d1a]/80 backdrop-blur-xl border-b border-white/10 flex items-center gap-4 px-6 z-30">
      {/* Search */}
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all"
        />
      </div>

      {/* Filter dropdown */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as typeof filter)}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-white focus:outline-none focus:border-purple-500/60 transition-all"
      >
        <option value="all">All Tasks</option>
        <option value="todo">In Progress</option>
        <option value="completed">Completed</option>
        <option value="high">🔴 High Priority</option>
        <option value="medium">🟡 Medium Priority</option>
        <option value="low">🟢 Low Priority</option>
      </select>

      {/* Add Task button */}
      <button
        onClick={onAddTask}
        className="flex items-center gap-2 px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all duration-200 shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)]"
      >
        + Add Task
      </button>

      {/* Notification bell */}
      <button className="relative w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
        🔔
      </button>
    </header>
  )
}
