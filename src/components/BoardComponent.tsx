import { Board } from "../core/Board";
import { FC, useEffect, useState } from "react";
import React from "react";
import { CellComponent } from ".";
import { Cell } from '../core/Cell';

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
}

export const BoardComponent: FC<BoardProps> = ({ board, setBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  useEffect(() => {
    highlightCells()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell])

  const isSelected = (cell: Cell): boolean => {
    return cell.x === selectedCell?.x && cell.y === selectedCell?.y
  }

  const onCellClicked = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell?.figure?.canMove(cell)) {
      selectedCell.figure.move(cell)
      setSelectedCell(null)
    } else {
      cell.figure && setSelectedCell(cell)
    }
  }

  const highlightCells = () => {
    board.highlightCells(selectedCell)
    updateBoard()
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }
 
  return (
    <div className="frame">
      <BoardLabels/>
      <div className="board">
        <>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent cell={cell} key={cell.id} clickHandler={onCellClicked} isSelected={isSelected(cell)} />
              ))}
            </React.Fragment>
          ))}
        </>
      </div>
    </div>
  );
}

const BoardLabels = () => (
  <>
    <div className="labels top">
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <span>D</span>
      <span>E</span>
      <span>F</span>
      <span>G</span>
      <span>H</span>
    </div>

    <div className="labels right">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>

    <div className="labels bottom">
      <span>A</span>
      <span>B</span>
      <span>C</span>
      <span>D</span>
      <span>E</span>
      <span>F</span>
      <span>G</span>
      <span>H</span>
    </div>

    <div className="labels left">
      <span>8</span>
      <span>7</span>
      <span>6</span>
      <span>5</span>
      <span>4</span>
      <span>3</span>
      <span>2</span>
      <span>1</span>
    </div>
  </>
)
