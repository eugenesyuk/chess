import { Color, MoveDirection, PieceType } from "../Globals";
import { Piece } from "../Piece";
import { Cell } from "../Cell";

export class King extends Piece {
  closePositions: Array<number[]> = [];

  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.King);
    this.setClosePositions();
  }

  canMove(target: Cell): boolean {
    let allow = true

    if (target.piece) {
      allow = this.isOwn(target.piece) && !this.isCastlingPossibleRook(target) ? false : allow
      allow = target.piece.is(PieceType.King) ? false : allow
    }

    allow = this.isActive ? allow : false
    allow = this.canMoveTo(target) ? allow : false
    allow = this.canMoveOnCheck(target) ? allow : false
    allow = this.wouldntCauseCheck(target) ? allow : false
  
    return allow
  }

  canPotentiallyAttack(target: Cell): boolean {
    return this.isClosePosition(target)
  }

  move(target: Cell): void {
    this.isCastling(target) ? this.performCastling(target) : super.move(target)
    this.setClosePositions();
  }

  performCastling(target: Cell) {
    const castlingDirection = target.x - this.cell.x > 0 ? MoveDirection.Right : MoveDirection.Left
    const isDirectionRook = (piece: Piece) => castlingDirection < 0 ? piece.cell.x < this.cell.x : piece.cell.x > this.cell.x
    const castlingRook = this.cell.board.getSome(piece => this.isFirstMoveOwnRook(piece) && isDirectionRook(piece))[0]
    const castlingNewKingCell = this.cell.board.cell(this.cell.y, this.cell.x + 2 * castlingDirection)
    const castlingNewRookCell = this.cell.board.cell(this.cell.y, this.cell.x + 1 * castlingDirection)

    this.performMove(castlingNewKingCell)
    castlingRook.performMove(castlingNewRookCell)

    console.log({castlingNewKingCell, castlingNewRookCell})
  }

  setClosePositions() {
    const x = this.cell.x;
    const y = this.cell.y;
    this.closePositions = [
      [y, x - 1],
      [y, x + 1],
      [y - 1, x],
      [y + 1, x],
      [y + 1, x - 1],
      [y + 1, x + 1],
      [y - 1, x - 1],
      [y - 1, x + 1],
    ]
  }

  canMoveTo(target: Cell) {
    return (this.isClosePosition(target) || this.isCastling(target)) && !this.wouldUnderAttackAt(target)
  }

  isClosePosition(target: Cell) {
    return this.closePositions.some(
      (position) => position[0] === target.y && position[1] === target.x
    )
  }

  isCastling(target: Cell): boolean {
    const isCastlingPossibleRook = this.isCastlingPossibleRook(target)
    return this.isFirstMove && !this.isChecked && isCastlingPossibleRook
  }

  isCastlingPossibleRook(target: Cell): boolean {  
    const firstMoveleftRook = this.cell.board.getSome(piece => this.isFirstMoveOwnRook(piece) && piece.cell.x < this.cell.x)[0]
    const firstMoveRightRook = this.cell.board.getSome(piece => this.isFirstMoveOwnRook(piece) && piece.cell.x > this.cell.x)[0]
    
    const isTargetLeftCastlingRookCell = firstMoveleftRook?.cell === target
    const isTargetRighCastlingRookCell = firstMoveRightRook?.cell === target

    const isHorizonatalLeftPathFree = firstMoveleftRook?.cell.isHorizonatalPathFree(this.cell)
    const isHorizonatalRightPathFree = firstMoveRightRook?.cell.isHorizonatalPathFree(this.cell)
    
    const isLeftCastlingCell = target.y === this.cell.y && target.x - this.cell.x === -2
    const isRightCastlingCell = target.y === this.cell.y && target.x - this.cell.x === 2

    const kingLeftPathCells = [
      this.cell.board.cell(this.cell.y, this.cell.x - 2),
      this.cell.board.cell(this.cell.y, this.cell.x - 1),
    ]
  
    const kingRightPathCells = [
      this.cell.board.cell(this.cell.y, this.cell.x + 1),
      this.cell.board.cell(this.cell.y, this.cell.x + 2)
    ]
  
    const isKingLeftPathNotChecked = !kingLeftPathCells.some(cell => cell && this.wouldUnderAttackAt(cell))
    const isKingRightPathNotChecked = !kingRightPathCells.some(cell => cell && this.wouldUnderAttackAt(cell))
  
    const isLeftRookCastlingPossible = (isTargetLeftCastlingRookCell || isLeftCastlingCell) && isHorizonatalLeftPathFree && isKingLeftPathNotChecked
    const isRightRookCastlingPossible = (isTargetRighCastlingRookCell || isRightCastlingCell) && isHorizonatalRightPathFree && isKingRightPathNotChecked

    return isLeftRookCastlingPossible || isRightRookCastlingPossible
  }

  isFirstMoveOwnRook = (piece: Piece) => {
    return piece.is(PieceType.Rook) && piece.isOwn(this) && piece.isFirstMove
  }

  get isChecked(): boolean {
    return this.cell.board.getCheckedKing() === this
  }
}