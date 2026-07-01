'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

type SidebarProps = {
  activePage?: string
  streak?: number
  completedTasks?: number
  totalTasks?: number
  userName?: string
  onTasksClick?: () => void
}

export default function Sidebar({
  activePage = 'dashboard',
  streak = 0,
  completedTasks = 0,
  totalTasks = 0,
  userName = 'there',
  onTasksClick,
}: SidebarProps) {
  const [comingSoon, setComingSoon] = useState<string | null>(null)

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '⊞', ready: true },
    { id: 'tasks', label: 'Tasks', icon: '✓', ready: true },
    { id: 'calendar', label: 'Calendar', icon: '📅', ready: false },
    { id: 'analytics', label: 'Analytics', icon: '📊', ready: false },
    { id: 'focus', label: 'Focus Mode', icon: '🎯', ready: false },
    { id: 'settings', label: 'Settings', icon: '⚙️', ready: false },
  ]

  function handleNavClick(item: typeof navItems[number]) {
    if (!item.ready) {
      setComingSoon(item.label)
      setTimeout(() => setComingSoon(null), 2500)
      return
    }

    if (item.id === 'tasks') {
      onTasksClick?.()
    }
    // Dashboard is already the current page — no action needed
  }

  // 7-day streak milestones
  const milestones = [1, 2, 3, 4, 5, 6, 7]

  return (
    <aside className="fixed left-0 top-0 h-screen w-56 bg-[#0d0d1a] border-r border-white/10 flex flex-col z-40 overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            🚀
          </div>
          <span className="text-white font-bold text-lg tracking-tight">FocusFlow</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="p-4 space-y-1 relative">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
              activePage === item.id
                ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
            {!item.ready && (
              <span className="ml-auto text-[10px] text-gray-500">🚧</span>
            )}
          </button>
        ))}

        {/* Coming Soon toast */}
        {comingSoon && (
          <div className="absolute left-4 right-4 bottom-2 bg-purple-900/90 border border-purple-500/40 rounded-xl px-4 py-3 shadow-xl backdrop-blur-xl animate-pulse">
            <p className="text-white text-xs font-semibold">
              🚧 {comingSoon} — Coming Soon!
            </p>
            <p className="text-purple-300 text-[11px] mt-0.5">
              This feature is under development.
            </p>
          </div>
        )}
      </nav>

      {/* Streak Card — 7 day streak */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border border-purple-500/30">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">🔥</span>
          <span className="text-white font-bold text-sm">{streak} Day Streak</span>
        </div>
        <p className="text-gray-400 text-xs mb-3">
          {streak > 0 ? "You're on fire! Keep it up." : 'Complete tasks to start your streak!'}
        </p>
        <div className="flex gap-2">
          {milestones.map((m) => (
            <div
              key={m}
              title={`${m} day milestone`}
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                streak >= m
                  ? 'bg-purple-500 text-white shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                  : 'bg-white/10 text-gray-500'
              }`}
            >
              ✓
            </div>
          ))}
        </div>
        <p className="text-gray-500 text-[10px] mt-2">
          {streak < 7 ? `${7 - streak} more day${7 - streak === 1 ? '' : 's'} to a 7-day streak!` : '🎉 7-day streak reached!'}
        </p>
      </div>

      {/* User greeting */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-white text-xs font-semibold mb-1">🌙 Working Late, {userName} 👋</p>
        <p className="text-gray-400 text-xs">Stay focused and keep going strong!</p>
      </div>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-all duration-200"
        >
          <span>↩</span>
          Logout
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-white/5 text-center">
        <p className="text-gray-500 text-[10px] leading-relaxed">
          © 2026 FocusFlow v1.0
        </p>
        <p className="text-gray-500 text-[10px]">
          Built by Zandile Kheswa 🚀
        </p>
      </div>
    </aside>
  )
}
