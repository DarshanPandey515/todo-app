import { useEffect, useState } from "react"

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000"

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(true)

  const loadTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/api/todos/`)
      const data = await res.json()
      setTodos(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const res = await fetch(`${API_URL}/api/todos/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: title.trim() }),
    })
    const todo = await res.json()
    setTodos((prev) => [...prev, todo])
    setTitle("")
  }

  const toggleTodo = async (todo) => {
    const res = await fetch(`${API_URL}/api/todos/${todo.id}/`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !todo.completed }),
    })
    const updated = await res.json()
    setTodos((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
  }

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/api/todos/${id}/`, { method: "DELETE" })
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto">
        {/* <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Todo App</h1> */}

        <form onSubmit={addTodo} className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 cursor-pointer"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todos.length === 0 ? (
          <p className="text-center text-gray-500">No todos yet. Add one above!</p>
        ) : (
          <ul className="space-y-2">
            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex items-center gap-3 bg-white p-4 rounded-lg shadow"
              >
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="h-5 w-5 accent-black"
                />
                <span
                  className={`flex-1 ${todo.completed ? "line-through text-gray-400" : "text-gray-800"}`}
                >
                  {todo.title}
                </span>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App
