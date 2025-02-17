import { useState } from 'react'

import './App.css'
import React from 'react'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <div className='bg-gray-700 text-white'>
    Welcome to Teachers Profile 
   </div>
   </>
  )
}

export default App
