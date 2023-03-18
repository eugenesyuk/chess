import CellComponent from "./CellComponent"
import { Board } from '../core/Board'
import { FC } from 'react'
import React from "react"

interface BoardProps {
  board: Board,
  setBoard: (board: Board) => void
}

const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  return (
    <div className="board">
      <>
        {board.cells.map((row, index) => 
          <React.Fragment>
            {row.map(cell => <CellComponent cell={cell} key={cell.id} />)}
          </React.Fragment>
        )}
      </>
    </div>
  )
}

export default BoardComponent