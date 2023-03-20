import { Board } from './Board';
import { Color } from './Enums';
import { Figure } from './Figure';

export class Cell {
  board: Board
  figure: Figure | null

  readonly x: number
  readonly y: number
  readonly color: Color

  isAvailable: boolean = false
  id: number = Math.random()

  constructor(board: Board, x: number, y: number, color: Color, figure: Figure | null) {
    this.board = board
    this.x = x
    this.y = y
    this.color = color
    this.figure = figure
  }

  get hasFigure(): boolean {
    return this.figure !== null
  }

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  isVerticalPathFree(target: Cell): boolean {
    if (this.x !== target.x) return false
    
    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let i = min + 1; i < max; i++) {
      if(this.board.cell(i, this.x).hasFigure) return false
    }

    return true
  }

  isHorizonatalPathFree(target: Cell): boolean {
    if (this.y !== target.y) return false
    
    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let x = min + 1; x < max; x++) {
      if(this.board.cell(this.y, x).hasFigure) return false
    }

    return true
  }

  isDiagonalPathFree(target: Cell): boolean {
    const diffY = this.y - target.y
    const diffX = this.x - target.x

    const stepsY = Math.abs(diffY)
    const stepsX = Math.abs(diffX)
  
    if (stepsX !== stepsY) return false

    for (let i = 1; i < stepsY; i++) {
      const nextX = target.x + (diffX / stepsX) * i
      const nextY = target.y + (diffY / stepsY) * i

      if(this.board.cell(nextY, nextX).hasFigure) return false
    }

    return true
  }
}
