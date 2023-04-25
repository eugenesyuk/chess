import { FC } from 'react'
import { Cell } from '../core/Cell'
import { classnames } from '../core/Utils'
import { PieceComponent } from '.'

interface CellProps {
  cell: Cell
  isSelected: boolean
  clickHandler: (cell: Cell) => void
}

export const CellComponent: FC<CellProps> = ({
  cell,
  isSelected,
  clickHandler
}) => {
  return (
    <div
      onClick={() => clickHandler(cell)}
      className={classnames(
        'cell',
        cell.color,
        isSelected ? 'selected' : '',
        cell.isAvailable && cell.piece ? 'available' : ''
      )}
    >
      {cell.isAvailable && (
        <div className='available-mark'></div>
      )}
      {cell.piece ? <PieceComponent piece={cell.piece} /> : <></>}
    </div>
  )
}