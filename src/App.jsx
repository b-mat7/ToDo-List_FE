import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './assets/components/pages/Login/Login'
import Protected from './assets/components/shared/Protected/Protected'
import Home from './assets/components/pages/Home/Home'

import './App.scss'

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </main>
  )
}

export default App