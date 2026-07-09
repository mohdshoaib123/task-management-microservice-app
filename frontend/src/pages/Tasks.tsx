import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

const API_URL = 'https://api-gateway-latest-2.onrender.com/api/v1/task'

type TaskItem = {
  id: string
  title: string
  description: string
  priority: string
  status: string
  dueDate?: string | null
  createdAt: string
  updatedAt: string
  userId: string
}

const Tasks = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchTasks = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/fetchalltasks`, { withCredentials: true })
      setTasks(response.data?.data?.tasks || [])
    } catch (axiosError: unknown) {
      const fallbackError = 'Unable to load tasks.'
      if (axios.isAxiosError(axiosError)) {
        const serverError =  axiosError.response?.data?.err?.message || fallbackError
        setError(serverError)
        toast.error(serverError)
      } else {
        setError(fallbackError)
        toast.error(fallbackError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void fetchTasks()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Your tasks</h1>
            <p className="mt-2 text-sm text-slate-600">Browse all your tasks and open one to manage it.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/create-task" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Create task
            </Link>
            <Link to="/" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Back home
            </Link>
          </div>
        </div>

        {error ? <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        {isLoading ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-medium text-slate-700">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">No tasks yet</h2>
            <p className="mt-2 text-sm text-slate-600">Create your first task to get started.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tasks.map((task) => (
              <Link
                key={task.id}
                to={`/tasks/${task.id}`}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      task.status === 'DONE'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.status === 'DONE' ? '✓ Done' : task.status}
                  </span>
                </div>
                <p className="mb-4 line-clamp-3 text-sm text-slate-600">{task.description}</p>
                <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
                  <span className="rounded-full bg-amber-50 px-3 py-1 font-medium text-amber-700">{task.priority}</span>
                  {task.dueDate ? <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span> : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tasks
