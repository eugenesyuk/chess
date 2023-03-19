import { Color, FigureName } from '../Enums';
import { Figure } from '../Figure';
import { Cell } from '../Cell';

export class Bishop extends Figure {
  constructor(color: Color, cell: Cell) {
    super(color, cell, FigureName.Bishop)
  }
}