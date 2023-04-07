import React, { useEffect, useState } from 'react'
import './App.scss'
import { BoardComponent } from './components';
import { Board } from './core/Board';

function App() {
  const [board, setBoard] = useState(new Board())

  useEffect(() => {
    restart()
  }, [])

  const restart = () => {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.respawnPieces()
    setBoard(newBoard)
  }

  return (
    <div className="chess-game">
      <BoardComponent board={board} setBoard={setBoard} />
    </div>
  );
}

export default App