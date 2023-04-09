import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Bishop)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.cell.isDiagonalPathFree(target) ? allow : false
    allow = super.canMoveOnCheck(target) ? allow : false
    return allow
  }

  canPotentiallyAttack(target: Cell): boolean {
    return this.cell.isDiagonalPathFree(target)
  }
}