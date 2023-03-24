import { Color, FigureName } from '../Enums';
import { Figure } from '../Figure';
import { Cell } from '../Cell';

export class Rook extends Figure {
  constructor(color: Color, cell: Cell) {
    super(color, cell, FigureName.Rook)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.isRookMoveAllowed(target) ? allow : false
    return allow
  }

  canPotentiallyAttack(target: Cell) {
    return this.isRookMoveAllowed(target)
  }

  isRookMoveAllowed(target: Cell) {
    return this.cell.isHorizonatalPathFree(target) || this.cell.isVerticalPathFree(target)
  }
}