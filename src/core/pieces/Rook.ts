import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Rook extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Rook)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.isRookMoveAllowed(target) ? allow : false
    allow = super.canMoveOnCheck(target) ? allow : false
    return allow
  }

  canPotentiallyAttack(target: Cell) {
    return this.isRookMoveAllowed(target)
  }

  isRookMoveAllowed(target: Cell) {
    return this.cell.isHorizonatalPathFree(target) || this.cell.isVerticalPathFree(target)
  }
}