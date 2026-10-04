"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getTasks, createTask, updateTask, deleteTask } from "../../lib/api";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
}

export default function DashboardPage() {
  const { token, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }
    fetchTasks();
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    if (!token) return;
    try {
      const data = await getTasks(token);
      setTasks(data);
      setError("");
    } catch (err) {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !title.trim()) return;

    setSubmitting(true);
    try {
      await createTask(token, title, description);
      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch (err) {
      setError("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleComplete = async (task: Task) => {
    if (!token) return;
    try {
      await updateTask(token, task.id, task.title, task.description, !task.completed);
      await fetchTasks();
    } catch (err) {
      setError("Failed to update task");
    }
  };

  const handleDelete = async (id: number) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this task?")) return;

    try {
      await deleteTask(token, id);
      await fetchTasks();
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TF</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800">TaskFlow</h1>
          </div>
          <button
            onClick={logout}
            className="text-sm px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
          <p className="text-gray-500 mt-1">Manage your personal tasks securely</p>
        </div>

        {/* Create Task Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <h3 className="font-semibold text-gray-800 mb-4">Add a new task</h3>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            />
            <textarea
              placeholder="Add a description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              rows={3}
            />
            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-xl transition"
            >
              {submitting ? "Adding..." : "Add Task"}
            </button>
          </form>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100">
            {error}
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-12 text-center">
              <p className="text-gray-400 text-lg">No tasks yet</p>
              <p className="text-gray-400 text-sm mt-1">Create your first task above</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className={`bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between gap-4 shadow-sm hover:shadow-md transition ${
                  task.completed ? "opacity-70" : ""
                }`}
              >
                <div className="flex-1 min-w-0">
                  <h4
                    className={`font-medium text-gray-800 ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </h4>
                  {task.description && (
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleComplete(task)}
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg transition ${
                      task.completed
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700 hover:bg-amber-100"
                    }`}
                  >
                    {task.completed ? "Completed" : "Mark Done"}
                  </button>

                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-xs font-medium px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}