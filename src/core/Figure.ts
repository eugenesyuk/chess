import { Cell } from './Cell';
import { Color, FigureName } from "./Enums";

export class Figure {
  color: Color
  cell: Cell
  name: FigureName
  id: number
  captured: boolean = false

  constructor(color: Color, cell: Cell, name: FigureName) {
    this.color = color
    this.cell = cell
    this.cell.figure = this
    this.name = name
    this.id = this.cell.board.getFigureId()
  }

  canMove(target: Cell): boolean {
    let allow = true

    if (target.figure) {
      allow = this.isOwnFigure(target.figure) ? false : allow
      allow = target.figure.is(FigureName.King) ? false : allow
    }
  
    return allow
  }

  canPotentiallyAttack(target: Cell){}

  isOwnFigure(figure: Figure) {
    return figure.color === this.color
  }

  is(name: FigureName) {
    return this.name === name
  }

  move(target: Cell) {
    if (this.canMove(target)) {
      this.cell.moveFigure(target)
    }
  }

  capture() {
    this.captured = true
  }

  isEnemyTo(target: Figure): boolean {
    return this.color !== target.color
  }

  isPotentiallyUnderAttackAt(target: Cell) {
    const board = this.cell.board
    const activeEnemyFigures = board.getActiveEnemyFigures(this)
    return activeEnemyFigures.some(figure => figure.canPotentiallyAttack(target))
  }
}