import { Cell } from './Cell'
import { Color, GameEvents, XNotationMap, YNotationMap } from './Globals'
import { Game } from './Game'
import { Piece } from './Piece'
import { Bishop } from './pieces/Bishop'
import { King } from './pieces/King'
import { Knight } from './pieces/Knight'
import { Pawn } from './pieces/Pawn'
import { Queen } from './pieces/Queen'
import { Rook } from './pieces/Rook'
import { EventsObserver } from './EventObserver'

export class Board {
  game: Game
  cells: Cell[][] = []
  whitePieces: Piece[] = []
  blackPieces: Piece[] = []
  pieces: Piece[] = []
  pieceId: number = 1

  constructor(game: Game) {
    this.game = game
  }

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
        target.isAvailable = !!selectedCell?.piece?.canMove(target)
      }
    }
  }

  getPieceId(): number {
    const id = this.pieceId
    this.pieceId++
    return id
  }

  getEnemyPieces(piece: Piece) {
    return piece.color === Color.Black ? this.whitePieces : this.blackPieces;
  }

  getActivePieces(pieces: Piece[]) {
    return pieces.filter(piece => !piece.captured)
  }

  getActiveEnemyPieces(piece: Piece) {
    return this.getActivePieces(this.getEnemyPieces(piece))
  }
  
  public respawnPieces() {
    this.respawnKings()
    this.respawnQueens()
    this.respawnBishops()
    this.respawnKnights()
    this.respawnRooks()
    this.respawnPawns()
  
    this.onPiecesRespawned()
  }

  public respawnPreMate() {
    this.blackPieces.push(new King(Color.Black, this.cellByNotation('A8')))
    this.whitePieces.push(new Rook(Color.White, this.cellByNotation('B1')))
    this.whitePieces.push(new Queen(Color.White, this.cellByNotation('F2')))
  
    this.onPiecesRespawned()
  }

  private respawnKings() {
    this.blackPieces.push(new King(Color.Black, this.cellByNotation('E8')))
    this.whitePieces.push(new King(Color.White, this.cellByNotation('E1')))
  }

  private respawnQueens() {
    this.blackPieces.push(new Queen(Color.Black, this.cellByNotation('D8')))
    this.whitePieces.push(new Queen(Color.White, this.cellByNotation('D1')))
  }

  private respawnBishops() {
    this.blackPieces.push(new Bishop(Color.Black, this.cellByNotation('C8')))
    this.blackPieces.push(new Bishop(Color.Black, this.cellByNotation('F8')))
    this.whitePieces.push(new Bishop(Color.White, this.cellByNotation('C1')))
    this.whitePieces.push(new Bishop(Color.White, this.cellByNotation('F1')))
  }

  private respawnKnights() {
    this.blackPieces.push(new Knight(Color.Black, this.cellByNotation('B8')))
    this.blackPieces.push(new Knight(Color.Black, this.cellByNotation('G8')))
    this.whitePieces.push(new Knight(Color.White, this.cellByNotation('B1')))
    this.whitePieces.push(new Knight(Color.White, this.cellByNotation('G1')))
  }

  private respawnRooks() {
    this.blackPieces.push(new Rook(Color.Black, this.cellByNotation('A8')))
    this.blackPieces.push(new Rook(Color.Black, this.cellByNotation('H8')))
    this.whitePieces.push(new Rook(Color.White, this.cellByNotation('A1')))
    this.whitePieces.push(new Rook(Color.White, this.cellByNotation('H1')))
  }

  private respawnPawns() {
    for (let [letter] of Array.from(XNotationMap)) {
      this.blackPieces.push(new Pawn(Color.Black, this.cellByNotation(`${letter}7`)))
      this.whitePieces.push(new Pawn(Color.White, this.cellByNotation(`${letter}2`)))
    }
  }

  private onPiecesRespawned() {
    this.pieces = [...this.whitePieces, ...this.blackPieces]
    EventsObserver.emit(GameEvents.PiecesRespawned, this.pieces)
  }
}