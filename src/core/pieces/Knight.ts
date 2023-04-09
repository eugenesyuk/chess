import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Knight extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Knight)
  }

  canMoveTo(target: Cell): boolean {
    const diffX = Math.abs(this.cell.x - target.x)
    const diffY = Math.abs(this.cell.y - target.y)

    return (diffX === 1 && diffY === 2) || (diffX === 2 && diffY === 1)
  }
}