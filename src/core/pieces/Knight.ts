import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Knight)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.isKnightMoveAllowed(target) ? allow : false
    allow = super.canMoveOnCheck(target) ? allow : false
    return allow
  }

  canPotentiallyAttack(target: Cell): boolean {
    return this.isKnightMoveAllowed(target)
  }

  isKnightMoveAllowed(target: Cell): boolean {
    const diffX = Math.abs(this.cell.x - target.x)
    const diffY = Math.abs(this.cell.y - target.y)

    return (diffX === 1 && diffY === 2) || (diffX === 2 && diffY === 1)
  }
}