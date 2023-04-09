import { Color, PieceType } from '../Globals'
import { Piece } from '../Piece'
import { Cell } from '../Cell'

export class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Queen)
  }

  canMoveTo(target: Cell): boolean {
    return this.cell.isHorizonatalPathFree(target) || this.cell.isVerticalPathFree(target) || this.cell.isDiagonalPathFree(target)
  }
}