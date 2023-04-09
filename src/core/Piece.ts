import { Cell } from './Cell'
import { Color, GameEvents, PieceType } from './Globals'
import { EventsObserver } from './EventObserver'

export class Piece {
  type: PieceType
  color: Color
  cell: Cell
  previousCell: Cell | null = null
  id: number
  captured: boolean = false

  constructor(color: Color, cell: Cell, type: PieceType) {
      this.type = type
      this.color = color
      this.cell = cell
      this.cell.piece = this
      this.id = this.cell.board.getPieceId()
  }

  canMove(target: Cell): boolean {
    let allow = true

    if (target.piece) {
      allow = this.isOwn(target.piece) ? false : allow
      allow = target.piece.is(PieceType.King) ? false : allow
    }
  
    return allow
  }

  canMoveOnCheck(target: Cell): boolean {
    const { isCheck, canAttackCheckingPiece, canCoverChecked, chekingPiece, availableCellsToCoverKing: availableCellsInBetween } = this.cell.board.game.check
  
    if (!isCheck) return true

    let allow = false
  
    allow = canCoverChecked.includes(this) && availableCellsInBetween.includes(target) ? true : allow
    allow = canAttackCheckingPiece.includes(this) && chekingPiece?.cell === target ? true : allow

    return allow
  }

  canPotentiallyAttack(target: Cell): boolean { return false }

  isOwn(piece: Piece) {
    return piece.color === this.color
  }

  is(type: PieceType) {
    return this.type === type
  }

  move(target: Cell) {
    if (this.canMove(target)) {
      this.previousCell = this.cell
      this.cell.movePiece(target)
      EventsObserver.emit(GameEvents.MoveMade, this)
    }
  }

  capture() {
    this.captured = true
  }

  isEnemyTo(target: Piece): boolean {
    return this.color !== target.color
  }

  wouldUnderAttackAt(target: Cell) {
    const piece = this.cell.piece
    const targetPiece = target.piece

    this.cell.piece = null

    if (targetPiece) {
      target.piece = null
      targetPiece.capture()
    }

    const board = this.cell.board
    const activeEnemyPieces = board.getActiveEnemyPieces(this)
    const wouldUnderAttack = activeEnemyPieces.some(piece => piece.canPotentiallyAttack(target))
    
    if (targetPiece) {
      targetPiece.captured = false
      target.piece = targetPiece
    }
  
    this.cell.piece = piece
    return wouldUnderAttack
  }

  isUnderAttack() {
    return this.wouldUnderAttackAt(this.cell)
  }

  getAvailableCells() {
    const availableCells = []
  
    for (let y = 0; y < this.cell.board.cells.length; y++) {
      const row = this.cell.board.cells[y]

      for (let x = 0; x < row.length; x++) {
        const target = row[x]
        this.canMove(target) && availableCells.push(target)
      }
    }

    return availableCells
  }

  getAvailableCellsInBetween(cell: Cell) {
    const availableCells = this.getAvailableCells()
    let availableInBetween: Cell[] = []

    const diffY = this.cell.y - cell.y
    const diffX = this.cell.x - cell.x

    // is vertically
    if (diffX === 0) {
      const min = Math.min(this.cell.y, cell.y)
      const max = Math.max(this.cell.y, cell.y)
      
      availableInBetween = availableCells.filter((cell) => cell.x === this.cell.x && cell.y > min && cell.y < max)
    // is horizontally
    } else if (diffY === 0) {
      const min = Math.min(this.cell.x, cell.x)
      const max = Math.max(this.cell.x, cell.x)

      availableInBetween = availableCells.filter((cell) => cell.y === this.cell.y && cell.x > min && cell.x < max)
    // is diagonally
    } else if (Math.abs(diffY) === Math.abs(diffX)) {
      const minX = Math.min(this.cell.x, cell.x)
      const maxX = Math.max(this.cell.x, cell.x)
      const minY = Math.min(this.cell.y, cell.y)
      const maxY = Math.max(this.cell.y, cell.y)
  
      availableInBetween = availableCells.filter((cell) => {
        return Math.abs(cell.x - this.cell.x) === Math.abs(cell.y - this.cell.y) &&
          cell.x > minX && cell.x < maxX &&
          cell.y > minY && cell.y < maxY
      })
    }

    return availableInBetween
  }

  getAttackingPieces() {
    const board = this.cell.board
    const activeEnemyPieces = board.getActiveEnemyPieces(this)
    return activeEnemyPieces.filter(piece => piece.canPotentiallyAttack(this.cell))
  }
}