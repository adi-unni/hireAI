import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          React + TypeScript + Tailwind
        </h1>
        <p className="text-gray-600">
          Edit <code className="text-sm bg-gray-100 p-1 rounded">src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App
