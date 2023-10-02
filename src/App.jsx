import { useState } from 'react'

import TopBar from './assets/components/TopBar/TopBar'
import FilterBar from './assets/components/FilterBar/FilterBar'
import TodosContainer from './assets/components/TodosContainer/TodosContainer'

import './App.scss'


function App() {


  return (
    <>
      <TopBar />
      <FilterBar />
      <TodosContainer/>
    </>
  )
}

export default App
