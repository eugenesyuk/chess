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
    allow = this.isKnightMoveAllowed(target) ? allow : false
    return allow
  }

  isKnightMoveAllowed(target: Cell): boolean {
    const diffX = Math.abs(this.cell.x - target.x)
    const diffY = Math.abs(this.cell.y - target.y)

    return (diffX === 1 && diffY === 2) || (diffX === 2 && diffY === 1)
  }
}