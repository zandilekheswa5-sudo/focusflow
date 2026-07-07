'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

type SidebarProps = {
  activePage?: string
  streak?: number
  userName?: string
  onTasksClick?: () => void
  mobileOpen: boolean
  setMobileOpen: (open: boolean) => void
  completedTasks?: number
  totalTasks?: number
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: '⊞', ready: true },
  { id: 'tasks', label: 'Tasks', icon: '✓', ready: true },
  { id: 'calendar', label: 'Calendar', icon: '📅', ready: false },
  { id: 'analytics', label: 'Analytics', icon: '📊', ready: false },
  { id: 'focus', label: 'Focus Mode', icon: '🎯', ready: false },
  { id: 'settings', label: 'Settings', icon: '⚙️', ready: false },
]

const milestones = [1, 2, 3, 4, 5, 6, 7]

export default function Sidebar({
  activePage = 'dashboard',
  streak = 0,
  userName = 'there',
  onTasksClick,
  mobileOpen,
  setMobileOpen,
}: SidebarProps) {
  const [comingSoon, setComingSoon] = useState<string | null>(null)

  const hour = new Date().getHours()
  const sidebarGreeting =
    hour >= 5 && hour < 12 ? '☀️ Good Morning' :
    hour >= 12 && hour < 18 ? '🌤️ Good Afternoon' :
    hour >= 18 && hour < 22 ? '🌙 Good Evening' :
    '🌙 Working Late'

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  async function handleLogout() {
    await supabase.auth.signOut()
    window.location.href = '/'
  }

  function handleNavClick(item: typeof navItems[number]) {
    setMobileOpen(false)
    if (!item.ready) {
      setComingSoon(item.label)
      setTimeout(() => setComingSoon(null), 2500)
      return
    }
    if (item.id === 'tasks') onTasksClick?.()
  }

  // ── Shared JSX blocks (not components) ──────────────────────

  const logoRow = (showClose: boolean) => (
    <div className="p-5 border-b border-white/10 flex items-center justify-between flex-shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-sm">
          🚀
        </div>
        <span className="text-white font-bold text-lg">FocusFlow</span>
      </div>
      {showClose && (
        <button
          onClick={() => setMobileOpen(false)}
          className="text-gray-400 hover:text-white w-8 h-8 flex items-center justify-center text-xl"
        >
          ✕
        </button>
      )}
    </div>
  )

  const navBlock = (
    <nav className="p-3 space-y-1 flex-shrink-0">
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
          <span className="text-base w-5 text-center">{item.icon}</span>
          {item.label}
          {!item.ready && <span className="ml-auto text-[10px] text-gray-500">🚧</span>}
        </button>
      ))}
      {comingSoon && (
        <div className="fixed bottom-6 left-4 right-4 md:left-auto md:right-auto md:w-52 bg-purple-900/95 border border-purple-500/40 rounded-xl px-4 py-3 shadow-2xl z-[60]">
          <p className="text-white text-xs font-semibold">🚧 {comingSoon} — Coming Soon!</p>
          <p className="text-purple-300 text-[11px] mt-0.5">This feature is under development.</p>
        </div>
      )}
    </nav>
  )

  const streakBlock = (
    <div className="mx-3 mb-3 p-4 rounded-2xl bg-gradient-to-br from-purple-900/60 to-indigo-900/40 border border-purple-500/30 flex-shrink-0">
      <div className="flex items-center gap-2 mb-1">
        <span>🔥</span>
        <span className="text-white font-bold text-sm">{streak} Day Streak</span>
      </div>
      <p className="text-gray-400 text-xs mb-3">
        {streak > 0 ? "You're on fire! Keep it up." : 'Complete tasks to start your streak!'}
      </p>
      <div className="flex gap-2">
        {milestones.map((m) => (
          <div key={m} className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${streak >= m ? 'bg-purple-500 text-white' : 'bg-white/10 text-gray-500'}`}>
            ✓
          </div>
        ))}
      </div>
      <p className="text-gray-500 text-[10px] mt-2">
        {streak < 7 ? `${7 - streak} more days to a 7-day streak!` : '🎉 7-day streak reached!'}
      </p>
    </div>
  )

  const greetingBlock = (
    <div className="mx-3 mb-3 p-3 rounded-2xl bg-white/5 border border-white/10 flex-shrink-0">
      <p className="text-white text-xs font-semibold mb-1">
        {sidebarGreeting}, {userName} 👋
      </p>
      <p className="text-gray-400 text-xs">Stay focused and keep going strong!</p>
    </div>
  )

  const footerBlock = (
    <div className="px-4 py-3 text-center flex-shrink-0">
      <p className="text-gray-600 text-[10px]">© 2026 FocusFlow v1.0</p>
      <p className="text-gray-600 text-[10px]">Built by Zandile Kheswa 🚀</p>
    </div>
  )

  const logoutBlock = (
    <div className="p-3 border-t border-white/10 flex-shrink-0 mt-auto">
      <button
        onClick={handleLogout}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-400 hover:bg-red-600/20 hover:text-red-400 transition-all"
      >
        <span>↩</span> Logout
      </button>
    </div>
  )

  return (
    <>
      {/* ── MOBILE BACKDROP ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE DRAWER ── */}
      <div
        className={`
          md:hidden fixed top-0 left-0 h-screen w-72
          bg-[#0d0d1a] border-r border-white/10 z-50
          transition-transform duration-300 ease-in-out
          flex flex-col overflow-y-auto
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {logoRow(true)}
        {navBlock}
        {streakBlock}
        {greetingBlock}
        {footerBlock}
        {logoutBlock}
      </div>

      {/* ── DESKTOP SIDEBAR ── */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-56 bg-[#0d0d1a] border-r border-white/10 z-40 flex-col overflow-y-auto">
        {logoRow(false)}
        {navBlock}
        {streakBlock}
        {greetingBlock}
        {footerBlock}
        {logoutBlock}
      </div>
    </>
  )
}
