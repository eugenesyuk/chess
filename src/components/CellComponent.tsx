import { FC } from 'react'
import { Cell } from '../core/Cell'
import { classnames } from '../core/Utils'
import { PieceComponent } from '.'

interface CellProps {
  cell: Cell
  isSelected: boolean
  clickHandler: (cell: Cell) => void
}

export const CellComponent: FC<CellProps> = ({ cell, isSelected, clickHandler }) => {
  return (
    <div
      onClick={() => clickHandler(cell)}
      className={classnames('cell', cell.color, isSelected ? 'selected' : '', cell.isAvailable && cell.piece ? 'available' : '')}>
      {cell.isAvailable && !cell.piece && <div className="available-point"></div>}
      {cell.piece ? <PieceComponent piece={cell.piece} /> : <></>}
    </div>
  )
}