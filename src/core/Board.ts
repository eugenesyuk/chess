import { Cell } from './Cell'
import { Color, XNotationMap, YNotationMap } from './Enums'
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

  public cellByNotation(notation: string): Cell {
    const xCoordinate = XNotationMap.get(notation[0].toLowerCase())
    const yCoordinate = YNotationMap.get(notation[1].toLowerCase())
  
    const x = typeof xCoordinate === 'number' ? xCoordinate : -1
    const y = typeof yCoordinate === 'number' ? yCoordinate : -1

    return this.cell(y, x)
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
    this.blackFigures.push(new King(Color.Black, this.cellByNotation('E8')))
    this.whiteFigures.push(new King(Color.White, this.cellByNotation('E1')))
  }

  private respawnQueens() {
    this.blackFigures.push(new Queen(Color.Black, this.cellByNotation('D8')))
    this.whiteFigures.push(new Queen(Color.White, this.cellByNotation('D1')))
  }

  private respawnBishops() {
    this.blackFigures.push(new Bishop(Color.Black, this.cellByNotation('C8')))
    this.blackFigures.push(new Bishop(Color.Black, this.cellByNotation('F8')))
    this.whiteFigures.push(new Bishop(Color.White, this.cellByNotation('C1')))
    this.whiteFigures.push(new Bishop(Color.White, this.cellByNotation('F1')))
  }

  private respawnKnights() {
    this.blackFigures.push(new Knight(Color.Black, this.cellByNotation('B8')))
    this.blackFigures.push(new Knight(Color.Black, this.cellByNotation('G8')))
    this.whiteFigures.push(new Knight(Color.White, this.cellByNotation('B1')))
    this.whiteFigures.push(new Knight(Color.White, this.cellByNotation('G1')))
  }

  private respawnRooks() {
    this.blackFigures.push(new Rook(Color.Black, this.cellByNotation('A8')))
    this.blackFigures.push(new Rook(Color.Black, this.cellByNotation('H8')))
    this.whiteFigures.push(new Rook(Color.White, this.cellByNotation('A1')))
    this.whiteFigures.push(new Rook(Color.White, this.cellByNotation('H1')))
  }

  private respawnPawns() {
    for (let [letter] of Array.from(XNotationMap)) {
      this.blackFigures.push(new Pawn(Color.Black, this.cellByNotation(`${letter}7`)))
      this.whiteFigures.push(new Pawn(Color.White, this.cellByNotation(`${letter}2`)))
    }
  }
}