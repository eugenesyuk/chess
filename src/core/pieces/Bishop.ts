import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Bishop extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Bishop)
  }

  canMoveTo(target: Cell) {
    return this.cell.isDiagonalPathFree(target)
  }
}