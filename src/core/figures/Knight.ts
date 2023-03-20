import { Color, FigureName } from '../Enums';
import { Figure } from '../Figure';
import { Cell } from '../Cell';

export class Knight extends Figure {
  constructor(color: Color, cell: Cell) {
    super(color, cell, FigureName.Knight)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.cell.isKnightMoveAllowed(target) ? allow : false
    return allow
  }
}