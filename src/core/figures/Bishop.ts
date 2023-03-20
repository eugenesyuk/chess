import { Color, FigureName } from '../Enums';
import { Figure } from '../Figure';
import { Cell } from '../Cell';

export class Bishop extends Figure {
  constructor(color: Color, cell: Cell) {
    super(color, cell, FigureName.Bishop)
  }

  canMove(target: Cell) {
    let allow = true
    allow = super.canMove(target) ? allow : false
    allow = this.cell.isDiagonalPathFree(target) ? allow : false
    return allow
  }
}