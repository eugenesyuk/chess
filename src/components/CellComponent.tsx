import { FC } from 'react'
import { Cell } from '../core/Cell'
import { classnames } from '../core/Utils'
import { PieceComponent } from '.'
import { PromotionPopupComponent } from './PromotionPopup'

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
        cell.isPromotion ? 'promotion' : '',
        cell.isAvailable && cell.piece ? 'available' : ''
      )}
    >
      {cell.isPromotion && cell.board.game.promotingPiece && <PromotionPopupComponent cell={cell} piece={cell.board.game.promotingPiece}/>}
      {cell.isAvailable && (
        <div className='available-mark'></div>
      )}
      {cell.piece && !cell.isPromotion ? <PieceComponent piece={cell.piece} /> : <></>}
    </div>
  )
}