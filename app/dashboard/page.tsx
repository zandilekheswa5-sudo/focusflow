'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Sidebar from '../components/Sidebar'
import TopNavbar from '../components/TopNavbar'
import DashboardHeader from '../components/DashboardHeader'
import TaskForm from '../components/TaskForm'
import Statistics from '../components/Statistics'
import Analytics from '../components/Analytics'
import UpcomingDeadlines from '../components/UpcomingDeadlines'
import SearchFilter from '../components/SearchFilter'
import TaskCard, { Task } from '../components/TaskCard'
import Confetti from 'react-confetti'
import { useWindowSize } from 'react-use'

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const taskFormRef = useRef<HTMLDivElement>(null)
  const yourTasksRef = useRef<HTMLDivElement>(null)
  const [task, setTask] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium')
  const [category, setCategory] = useState<'Learning' | 'Work' | 'Personal' | 'Health'>('Learning')
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const { width, height } = useWindowSize()

  const [filter, setFilter] = useState<
    'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low'
  >('all')

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>('there')

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUserId(user.id)
        loadTasks(user.id)

        // Pull the name saved at signup (user_metadata.full_name)
        const fullName = user.user_metadata?.full_name as string | undefined
        if (fullName) {
          setUserName(fullName)
        } else if (user.email) {
          // fallback: use the part of the email before @ if no name was saved
          setUserName(user.email.split('@')[0])
        }
      }
    }
    getUser()
  }, [])

  async function loadTasks(currentUserId: string) {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', currentUserId)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setTasks(data as Task[])
    }
  }

  async function addTask() {
    if (!task.trim()) return
    if (!userId) return

    if (editingTaskId) {
      await supabase
        .from('tasks')
        .update({
          title: task,
          due_date: dueDate || null,
          priority,
          category,
        })
        .eq('id', editingTaskId)

      setEditingTaskId(null)
    } else {
      await supabase.from('tasks').insert({
        user_id: userId,
        title: task,
        due_date: dueDate || null,
        priority,
        category,
        status: 'todo',
      })
    }

    setTask('')
    setDueDate('')
    setPriority('medium')
    setCategory('Learning')
    setShowTaskForm(false)

    if (userId) loadTasks(userId)
  }

  async function completeTask(id: string) {
    await supabase
      .from('tasks')
      .update({ status: 'completed' })
      .eq('id', id)

    setShowConfetti(true)
    setTimeout(() => setShowConfetti(false), 6000)

    if (userId) loadTasks(userId)
  }

  async function deleteTask(id: string) {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return

    await supabase.from('tasks').delete().eq('id', id)

    if (userId) loadTasks(userId)
  }

  function editTask(taskItem: Task) {
    setEditingTaskId(taskItem.id)
    setTask(taskItem.title)
    setDueDate(taskItem.due_date ?? '')
    setPriority(taskItem.priority)
    setCategory(taskItem.category)
    setShowTaskForm(true)

    taskFormRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  }

  function handleAddTaskClick() {
    setEditingTaskId(null)
    setTask('')
    setDueDate('')
    setPriority('medium')
    setCategory('Learning')
    setShowTaskForm(true)

    setTimeout(() => {
      taskFormRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }, 100)
  }

  function handleTasksNavClick() {
    yourTasksRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesFilter =
        filter === 'all' ||
        t.status === filter ||
        t.priority === filter
      return matchesSearch && matchesFilter
    })
  }, [tasks, searchTerm, filter])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.status === 'completed').length
  const remainingTasks = totalTasks - completedTasks
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

  const dueThisWeek = tasks.filter((t) => {
    if (!t.due_date) return false
    const today = new Date()
    const due = new Date(t.due_date)
    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    return diff >= 0 && diff <= 7
  }).length

  const streak = completedTasks > 0 ? Math.min(completedTasks, 30) : 0

  const greeting = (() => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) return '☀️ Good Morning'
    if (hour >= 12 && hour < 18) return '🌤️ Good Afternoon'
    if (hour >= 18 && hour < 22) return '🌙 Good Evening'
    return '🌙 Working Late'
  })()

  return (
    <>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={false}
          numberOfPieces={500}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 9999 }}
        />
      )}

      <Sidebar
        activePage="dashboard"
        streak={streak}
        completedTasks={completedTasks}
        totalTasks={totalTasks}
        userName={userName}
        onTasksClick={handleTasksNavClick}
      />

      <TopNavbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filter={filter}
        setFilter={setFilter}
        onAddTask={handleAddTaskClick}
      />

      <main className="ml-56 pt-16 min-h-screen bg-[#0d0d1a]">
        <div className="fixed inset-0 ml-56 pointer-events-none overflow-hidden">
          <div className="absolute top-[-200px] left-[10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[120px]" />
          <div className="absolute bottom-[-100px] right-[5%] w-[400px] h-[400px] rounded-full bg-indigo-600/10 blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-8">

          <DashboardHeader
            greeting={greeting}
            userName={userName}
            completedTasks={completedTasks}
            totalTasks={totalTasks}
            progress={progress}
          />

          <Statistics
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            remainingTasks={remainingTasks}
            progress={progress}
            dueThisWeek={dueThisWeek}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Analytics
              highPriorityTasks={tasks.filter((t) => t.priority === 'high').length}
              mediumPriorityTasks={tasks.filter((t) => t.priority === 'medium').length}
              lowPriorityTasks={tasks.filter((t) => t.priority === 'low').length}
              overdueTasks={tasks.filter((t) => {
                if (!t.due_date) return false
                return new Date(t.due_date) < new Date() && t.status !== 'completed'
              }).length}
            />

            <UpcomingDeadlines
              upcomingTasks={tasks
                .filter((t) => t.status !== 'completed' && t.due_date)
                .sort(
                  (a, b) =>
                    new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime()
                )
                .slice(0, 5)}
            />
          </div>

          {showTaskForm && (
            <div ref={taskFormRef}>
              <TaskForm
                task={task}
                setTask={setTask}
                dueDate={dueDate}
                setDueDate={setDueDate}
                priority={priority}
                setPriority={setPriority}
                category={category}
                setCategory={setCategory}
                editing={editingTaskId !== null}
                addTask={addTask}
              />
            </div>
          )}

          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            filter={filter}
            setFilter={setFilter}
          />

          <div ref={yourTasksRef} className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-white">Your Tasks</h2>
            <span className="text-sm text-gray-400">
              {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid gap-4">
            {filteredTasks.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center text-gray-400">
                <p className="text-4xl mb-3">✅</p>
                <p className="font-medium">No tasks found.</p>
                <p className="text-sm mt-1 text-gray-500">
                  Click "+ Add Task" to get started.
                </p>
              </div>
            ) : (
              filteredTasks.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  completeTask={completeTask}
                  deleteTask={deleteTask}
                  editTask={editTask}
                />
              ))
            )}
          </div>

        </div>
      </main>
    </>
  )
}
