import { Cell } from './Cell'
import { Color } from './Enums'
import { Bishop } from './figures/Bishop'
import { King } from './figures/King'
import { Knight } from './figures/Knight'
import { Pawn } from './figures/Pawn'
import { Queen } from './figures/Queen'
import { Rook } from './figures/Rook'

export class Board {
  cells: Cell[][] = []

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = []

      for (let x = 0; x < 8; x++) {
        const isEven = (y + x) % 2 === 0
        const cellColor = isEven ? Color.White : Color.Black
        row.push(new Cell(this, x, y, cellColor, null))
      }

      this.cells.push(row)
    }
  }

  private cell(y: number, x: number) {
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

  public respawnFigures() {
    this.respawnKings()
    this.respawnQueens()
    this.respawnBishops()
    this.respawnKnights()
    this.respawnRooks()
    this.respawnPawns()
  }

  private respawnKings() {
    new King(Color.Black, this.cell(0, 4))
    new King(Color.White, this.cell(7, 4))
  }

  private respawnQueens() {
    new Queen(Color.Black, this.cell(0, 3))
    new Queen(Color.White, this.cell(7, 3))
  }

  private respawnBishops() {
    new Bishop(Color.Black, this.cell(0, 2))
    new Bishop(Color.Black, this.cell(0, 5))
    new Bishop(Color.White, this.cell(7, 2))
    new Bishop(Color.White, this.cell(7, 5))
  }

  private respawnKnights() {
    new Knight(Color.Black, this.cell(0, 1))
    new Knight(Color.Black, this.cell(0, 6))
    new Knight(Color.White, this.cell(7, 1))
    new Knight(Color.White, this.cell(7, 6))
  }

  private respawnRooks() {
    new Rook(Color.Black, this.cell(0, 0))
    new Rook(Color.Black, this.cell(0, 7))
    new Rook(Color.White, this.cell(7, 7))
    new Rook(Color.White, this.cell(7, 0))
  }

  private respawnPawns() {
    for (let x = 0; x < 8; x++) {
        new Pawn(Color.Black, this.cell(1, x))
        new Pawn(Color.White, this.cell(6, x))
    }
  }
}