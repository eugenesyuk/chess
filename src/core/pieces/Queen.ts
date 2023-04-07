import { Color, PieceType } from '../Enums'
import { Piece } from '../Piece'
import { Cell } from '../Cell'

export class Queen extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Queen)
  }

  canMove(target: Cell) {
    let allow = true;
    allow = super.canMove(target) ? allow : false;
    allow = this.isQueenMoveAllowed(target) ? allow : false
    return allow
  }

  isQueenMoveAllowed(target: Cell): boolean {
    return this.cell.isHorizonatalPathFree(target) || this.cell.isVerticalPathFree(target) || this.cell.isDiagonalPathFree(target)
  }

  canPotentiallyAttack(target: Cell): boolean {
    return this.isQueenMoveAllowed(target)
  }
}