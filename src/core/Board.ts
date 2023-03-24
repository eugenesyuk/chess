import { Cell } from './Cell'
import { Color } from './Enums'
import { Figure } from './Figure'
import { Bishop } from './figures/Bishop'
import { King } from './figures/King'
import { Knight } from './figures/Knight'
import { Pawn } from './figures/Pawn'
import { Queen } from './figures/Queen'
import { Rook } from './figures/Rook'

export class Board {
  cells: Cell[][] = []
  whiteFigures: Figure[] = []
  blackFigures: Figure[] = []
  figureId: number = 1

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = []

      for (let x = 0; x < 8; x++) {
        const isEven = (y + x) % 2 === 0
        const cellColor = isEven ? Color.White : Color.Black
        row.push(new Cell(y + x, this, x, y, cellColor, null))
      }

      this.cells.push(row)
    }
  }

  public cell(y: number, x: number) {
    return this.cells[y][x]
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let y = 0; y < this.cells.length; y++) {
      const row = this.cells[y]

      for (let x = 0; x < row.length; x++) {
        const target = row[x]
        target.isAvailable = !!selectedCell?.figure?.canMove(target)
      }
    }
  }

  getCopyBoard(): Board {
    const board = new Board()
    board.cells = this.cells
    return board
  }

  getFigureId(): number {
    const id = this.figureId
    this.figureId++
    return id
  }

  getEnemyFigures(figure: Figure) {
    return figure.color === Color.Black ? this.whiteFigures : this.blackFigures;
  }

  getActiveFigures(figures: Figure[]) {
    return figures.filter(figure => !figure.captured)
  }

  getActiveEnemyFigures(figure: Figure) {
    return this.getActiveFigures(this.getEnemyFigures(figure))
  }
  
  public respawnFigures() {
    this.respawnKings()
    this.respawnQueens()
    this.respawnBishops()
    this.respawnKnights()
    this.respawnRooks()
    this.respawnPawns()
  }

  private respawnKings() {
    this.blackFigures.push(new King(Color.Black, this.cell(0, 4)))
    this.whiteFigures.push(new King(Color.White, this.cell(7, 4)))
  }

  private respawnQueens() {
    this.blackFigures.push(new Queen(Color.Black, this.cell(0, 3)))
    this.whiteFigures.push(new Queen(Color.White, this.cell(7, 3)))
  }

  private respawnBishops() {
    this.blackFigures.push(new Bishop(Color.Black, this.cell(0, 2)))
    this.blackFigures.push(new Bishop(Color.Black, this.cell(0, 5)))
    this.whiteFigures.push(new Bishop(Color.White, this.cell(7, 2)))
    this.whiteFigures.push(new Bishop(Color.White, this.cell(7, 5)))
  }

  private respawnKnights() {
    this.blackFigures.push(new Knight(Color.Black, this.cell(0, 1)))
    this.blackFigures.push(new Knight(Color.Black, this.cell(0, 6)))
    this.whiteFigures.push(new Knight(Color.White, this.cell(7, 1)))
    this.whiteFigures.push(new Knight(Color.White, this.cell(7, 6)))
  }

  private respawnRooks() {
    this.blackFigures.push(new Rook(Color.Black, this.cell(0, 0)))
    this.blackFigures.push(new Rook(Color.Black, this.cell(0, 7)))
    this.whiteFigures.push(new Rook(Color.White, this.cell(7, 7)))
    this.whiteFigures.push(new Rook(Color.White, this.cell(7, 0)))
  }

  private respawnPawns() {
    for (let x = 0; x < 8; x++) {
      this.blackFigures.push(new Pawn(Color.Black, this.cell(1, x)))
      this.whiteFigures.push(new Pawn(Color.White, this.cell(6, x)))
    }
  }
}