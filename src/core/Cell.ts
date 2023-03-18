import { Board } from './Board';
import { CellColor } from './CellColor';
import { Figure } from './Figure';

export class Cell {
  board: Board;
  figure: Figure | null;

  readonly x: number ;
  readonly y: number;
  readonly color: CellColor;

  available: boolean = false;
  id: number = Math.random();

  constructor(board: Board, x: number, y: number, color: CellColor, figure: Figure | null) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.color = color;
    this.figure = figure;
  }
}