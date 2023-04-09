import { Color, PieceType } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Rook extends Piece {
  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Rook)
  }

  canMoveTo(target: Cell) {
    return this.cell.isHorizonatalPathFree(target) || this.cell.isVerticalPathFree(target)
  }
}