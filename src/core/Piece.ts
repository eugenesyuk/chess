import { Cell } from './Cell';
import { Color, PieceType } from "./Enums";

export class Piece {
  color: Color
  cell: Cell
  name: PieceType
  id: number
  captured: boolean = false

  constructor(color: Color, cell: Cell, name: PieceType) {
    this.color = color
    this.cell = cell
    this.cell.piece = this
    this.name = name
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

  canPotentiallyAttack(target: Cell){}

  isOwn(piece: Piece) {
    return piece.color === this.color
  }

  is(name: PieceType) {
    return this.name === name
  }

  move(target: Cell) {
    if (this.canMove(target)) {
      this.cell.movePiece(target)
    }
  }

  capture() {
    this.captured = true
  }

  isEnemyTo(target: Piece): boolean {
    return this.color !== target.color
  }

  isPotentiallyUnderAttackAt(target: Cell) {
    const board = this.cell.board
    const activeEnemyPieces = board.getActiveEnemyPieces(this)
    return activeEnemyPieces.some(piece => piece.canPotentiallyAttack(target))
  }
}