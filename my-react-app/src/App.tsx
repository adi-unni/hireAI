import { useState } from 'react'
import axios from 'axios';


function App() {
  const [count, setCount] = useState(0)

  const fetchAPI = async() => {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await response.json()
    console.log(data)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          React + TypeScript + Tailwind
        </h1>
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
          <div className="text-center">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              onClick={() => setCount((count) => count + 1)}
            >
              Count is {count}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App