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

  canMove(target: Cell) {
    let allow = true

    if (target.figure) {
      allow = this.isOwnFigure(target.figure) ? false : allow
      allow = target.figure.is(FigureName.King) ? false : allow
    }
  
    return allow
  }

  isOwnFigure(figure: Figure) {
    return figure.color === this.color
  }

  is(name: FigureName) {
    return this.name === name
  }

  move(target: Cell) {
    if (this.canMove(target)) {
      target.figure = this
      this.cell.figure = null
      this.cell = target
    }
  }
}