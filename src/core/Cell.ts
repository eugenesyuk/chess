import { Board } from './Board';
import { Color } from './Enums';
import { Piece } from './Piece';

export class Cell {
  board: Board
  piece: Piece | null

  readonly x: number
  readonly y: number
  readonly color: Color

  isAvailable: boolean = false
  id: number

  constructor(id: number, board: Board, x: number, y: number, color: Color, piece: Piece | null) {
    this.board = board
    this.x = x
    this.y = y
    this.color = color
    this.piece = piece
    this.id = id
  }

  get hasPiece(): boolean {
    return this.piece !== null
  }

  movePiece(target: Cell) {
    if (this.piece) {
      target.hasEnemyPiece(this) && target.piece?.capture()
      this.piece.cell = target
      target.piece = this.piece
      this.piece = null
    }
  }

  isVerticalPathFree(target: Cell): boolean {
    if (this.x !== target.x) return false
    
    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let i = min + 1; i < max; i++) {
      if(this.board.cell(i, this.x).hasPiece) return false
    }

    return true
  }

  isHorizonatalPathFree(target: Cell): boolean {
    if (this.y !== target.y) return false
    
    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let x = min + 1; x < max; x++) {
      if(this.board.cell(this.y, x).hasPiece) return false
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

      if(this.board.cell(nextY, nextX).hasPiece) return false
    }

    return true
  }

  hasEnemyPiece(target: Cell): boolean {
    return target.piece != null && this.piece != null && target.piece.isEnemyTo(this.piece)
  }
}
