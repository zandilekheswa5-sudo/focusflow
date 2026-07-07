'use client'

type TopNavbarProps = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filter: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low'
  setFilter: (value: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low') => void
  onAddTask: () => void
  onMenuClick: () => void
}

export default function TopNavbar({
  searchTerm,
  setSearchTerm,
  filter,
  setFilter,
  onAddTask,
  onMenuClick,
}: TopNavbarProps) {
  return (
    <header className="fixed top-0 left-0 md:left-56 right-0 h-14 bg-[#0d0d1a]/90 backdrop-blur-xl border-b border-white/10 z-30 flex items-center px-3 md:px-5 gap-2">

      {/* Hamburger — mobile only */}
      <button
        onClick={onMenuClick}
        className="md:hidden flex-shrink-0 w-9 h-9 bg-purple-600 hover:bg-purple-700 rounded-xl flex items-center justify-center text-white text-base transition-all"
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Search — constrained width so buttons don't get pushed off */}
      <div className="relative w-32 sm:w-48 md:flex-1">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
          🔍
        </span>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/60 transition-all"
        />
      </div>

      {/* Filter — hidden on mobile */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value as typeof filter)}
        className="hidden md:block flex-shrink-0 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-sm text-white focus:outline-none"
      >
        <option value="all">All Tasks</option>
        <option value="todo">In Progress</option>
        <option value="completed">Completed</option>
        <option value="high">🔴 High</option>
        <option value="medium">🟡 Medium</option>
        <option value="low">🟢 Low</option>
      </select>

      {/* Spacer pushes buttons to right on desktop */}
      <div className="flex-1 md:hidden" />

      {/* Add Task — always visible, text always visible */}
      <button
        onClick={onAddTask}
        className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold transition-all shadow-[0_0_16px_rgba(168,85,247,0.4)]"
      >
        + <span className="hidden sm:inline">Add Task</span>
      </button>

      {/* Bell — always visible */}
      <button className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all text-sm">
        🔔
      </button>
    </header>
  )
}
