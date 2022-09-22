import React from 'react'
import logo from './logo.svg'
import './App.scss'
import { Board } from './components/board/board'

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>TNT Game of Life</p>
      </header>
      <Board title='board'></Board>
    </div>
  )
}

export default App
