import { Cell } from './Cell';
import { Color, FigureName } from "./Enums";

export class Figure {
  color: Color
  cell: Cell
  name: FigureName
  id: number = Math.random()

  constructor(color: Color, cell: Cell, name: FigureName) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.name = name
  }

  canMove(cell: Cell) {
    return true
  }
}