import { Color, PieceType } from "../Globals";
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
      allow = this.isOwn(target.piece) && !target.piece.is(PieceType.Rook) ? false : allow
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
    super.move(target);
    this.setClosePositions();
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
    return (this.isClosePosition(target) || this.isCastlingPossible(target)) && !this.wouldUnderAttackAt(target)
  }

  isClosePosition(target: Cell) {
    return this.closePositions.some(
      (position) => position[0] === target.y && position[1] === target.x
    )
  }

  isCastlingPossible(target: Cell): boolean {
    const isTargetCastlingPossibleMove = this.isTargetCastlingPossibleMove(target)

    return this.isFirstMove && !this.isChecked && isTargetCastlingPossibleMove
  }

  isTargetCastlingPossibleMove(target: Cell): boolean {
    const isFirstMoveOwnRook = (piece: Piece) => piece.is(PieceType.Rook) && piece.isOwn(this) && piece.isFirstMove
  
    const firstMoveleftRook = this.cell.board.getSome(piece => isFirstMoveOwnRook(piece) && piece.cell.x < this.cell.x)[0]
    const firstMoveRightRook = this.cell.board.getSome(piece => isFirstMoveOwnRook(piece) && piece.cell.x > this.cell.x)[0]
    
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
  
    const isKingLeftPathNotChecked = !kingLeftPathCells.some(cell => this.wouldUnderAttackAt(cell))
    const isKingRightPathNotChecked = !kingRightPathCells.some(cell => this.wouldUnderAttackAt(cell))
  
    const isLeftRookCastlingPossible = isHorizonatalLeftPathFree && isKingLeftPathNotChecked && (isTargetLeftCastlingRookCell || isLeftCastlingCell)
    const isRightRookCastlingPossible = isHorizonatalRightPathFree && isKingRightPathNotChecked && (isTargetRighCastlingRookCell || isRightCastlingCell)

    return isLeftRookCastlingPossible || isRightRookCastlingPossible
  }

  get isChecked(): boolean {
    return this.cell.board.getCheckedKing() === this
  }
}