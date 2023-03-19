import { FC } from "react"
import { Cell } from "../core/Cell"
import { classnames } from '../core/Utils'
import { FigureComponent } from '.'

interface CellProps {
  cell: Cell
}

export const CellComponent: FC<CellProps> = ({ cell }) => {
  return (
    <div className={classnames('cell', cell.color)}>
      {cell.figure ? <FigureComponent figure={cell.figure} /> : <></>}
    </div>
  )
}