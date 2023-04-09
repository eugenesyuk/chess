import { Cell } from './Cell'
import { Color, GameEvents, PieceType, XNotationMap, YNotationMap } from './Globals'
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

  getOwnPieces(piece: Piece): Piece[] {
    return piece.color === Color.White ? this.whitePieces : this.blackPieces
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

  getSome(predicate: (piece: Piece) => boolean): Piece[] {
    return this.pieces.filter(predicate)
  }

  getCheckedKing(): Piece {
    return this.getSome((piece) => piece.type === PieceType.King && piece.isUnderAttack())[0]
  }

  getCanCoverKingPieces(checkingPiece: Piece, checkedKing: Piece): Piece[] {  
    const availableCellsInBetween = checkingPiece.getAvailableCellsInBetween(checkedKing.cell)
    const canCoverChecked: Piece[] = []
    
    for (const availableCellInBetween of availableCellsInBetween) {
      const pieces = this.getSome((piece: Piece) => !piece.is(PieceType.King) && piece.isEnemyTo(checkingPiece) && piece.canMove(availableCellInBetween))
      pieces.length && canCoverChecked.push(...pieces)
    }

    this.game.check.availableCellsToCoverKing = availableCellsInBetween
    
    return canCoverChecked
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
    new King(Color.Black, this.cellByNotation('A8'))
    new Rook(Color.Black, this.cellByNotation('G6'))
    new Queen(Color.White, this.cellByNotation('E2'))
    new Rook(Color.White, this.cellByNotation('B1'))
  
    this.onPiecesRespawned()
  }

  private respawnKings() {
    new King(Color.Black, this.cellByNotation('E8'))
    new King(Color.White, this.cellByNotation('E1'))
  }

  private respawnQueens() {
    new Queen(Color.Black, this.cellByNotation('D8'))
    new Queen(Color.White, this.cellByNotation('D1'))
  }

  private respawnBishops() {
    new Bishop(Color.Black, this.cellByNotation('C8'))
    new Bishop(Color.Black, this.cellByNotation('F8'))
    new Bishop(Color.White, this.cellByNotation('C1'))
    new Bishop(Color.White, this.cellByNotation('F1'))
  }

  private respawnKnights() {
    new Knight(Color.Black, this.cellByNotation('B8'))
    new Knight(Color.Black, this.cellByNotation('G8'))
    new Knight(Color.White, this.cellByNotation('B1'))
    new Knight(Color.White, this.cellByNotation('G1'))
  }

  private respawnRooks() {
    new Rook(Color.Black, this.cellByNotation('A8'))
    new Rook(Color.Black, this.cellByNotation('H8'))
    new Rook(Color.White, this.cellByNotation('A1'))
    new Rook(Color.White, this.cellByNotation('H1'))
  }

  private respawnPawns() {
    for (let [letter] of Array.from(XNotationMap)) {
      new Pawn(Color.Black, this.cellByNotation(`${letter}7`))
      new Pawn(Color.White, this.cellByNotation(`${letter}2`))
    }
  }

  private onPiecesRespawned() {
    this.pieces = [...this.whitePieces, ...this.blackPieces]
    EventsObserver.emit(GameEvents.PiecesRespawned, this.pieces)
  }
}