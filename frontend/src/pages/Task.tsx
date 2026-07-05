import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'

const API_URL = 'http://localhost:3000/api/v1/task'

type TaskItem = {
  id: string
  title: string
  description: string
  priority: string
  status: string
  dueDate?: string | null
  createdAt?: string
  updatedAt?: string
  userId: string
}

const TaskPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [task, setTask] = useState<TaskItem | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const fetchTask = async () => {
    if (!id) return

    try {
      setIsLoading(true)
      const response = await axios.get(`${API_URL}/fetchsingletask/${id}`, { withCredentials: true })
      setTask(response.data?.data?.task || null)
    } catch (axiosError: unknown) {
      const fallbackError = 'Unable to load this task.'
      if (axios.isAxiosError(axiosError)) {
        const serverError = axiosError.response?.data?.error || axiosError.response?.data?.err?.message || fallbackError
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
    void fetchTask()
  }, [id])

  const handleComplete = async () => {
    if (!id || !task) return

    try {
      setIsSaving(true)
      const response = await axios.put(
        `${API_URL}/update/${id}`,
        { title: task.title, description: task.description, priority: task.priority, status: 'DONE', dueDate: task.dueDate || undefined },
        { withCredentials: true },
      )
      const successMessage = response.data?.data?.message || 'Task marked as complete.'
      toast.success(successMessage)
      await fetchTask()
    } catch (axiosError: unknown) {
      const fallbackError = 'Unable to complete this task.'
      if (axios.isAxiosError(axiosError)) {
        const serverError =  axiosError.response?.data?.err?.message || fallbackError
        setError(serverError)
        toast.error(serverError)
      } else {
        setError(fallbackError)
        toast.error(fallbackError)
      }
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!id) return
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (!confirmed) return

    try {
      setIsSaving(true)
      const response = await axios.delete(`${API_URL}/delete/${id}`, { withCredentials: true })
      const successMessage = response.data?.data?.message || 'Task deleted successfully.'
      toast.success(successMessage)
      navigate('/tasks')
    } catch (axiosError: unknown) {
      const fallbackError = 'Unable to delete this task.'
      if (axios.isAxiosError(axiosError)) {
        const serverError = axiosError.response?.data?.error || axiosError.response?.data?.err?.message || fallbackError
        setError(serverError)
        toast.error(serverError)
      } else {
        setError(fallbackError)
        toast.error(fallbackError)
      }
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Task details</h1>
            <p className="mt-2 text-sm text-slate-600">View task details and choose an action.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/tasks" className="rounded-full border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100">
              Back to tasks
            </Link>
            <Link to="/create-task" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
              Create another task
            </Link>
          </div>
        </div>

        {error ? <p className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p> : null}

        {isLoading ? (
          <div className="rounded-3xl bg-white p-8 text-center shadow-xl">
            <p className="text-sm font-medium text-slate-700">Loading task...</p>
          </div>
        ) : !task ? (
          <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
            <h2 className="text-xl font-semibold text-slate-900">Task not found</h2>
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-8 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">{task.title}</h2>
                <p className="mt-3 text-sm leading-7 text-slate-600">{task.description}</p>
              </div>
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

            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Priority</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{task.priority}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Due date</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Updated</p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{task.updatedAt ? new Date(task.updatedAt).toLocaleString() : 'Not available'}</p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to={`/update-task/${task.id}`}
                className="rounded-2xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-slate-700"
              >
                Update task
              </Link>
              <button
                type="button"
                onClick={handleComplete}
                disabled={isSaving}
                className="rounded-2xl border border-emerald-600 px-4 py-3 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? 'Working...' : 'Complete task'}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                disabled={isSaving}
                className="rounded-2xl border border-rose-300 px-4 py-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Delete task
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TaskPage
