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

  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }
}