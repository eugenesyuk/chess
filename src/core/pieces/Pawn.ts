import { Color, PieceType, MoveDirection } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Pawn extends Piece {
  isFirstMove: boolean = true
  moveDirection: MoveDirection

  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Pawn)
    this.moveDirection = color === Color.Black ? MoveDirection.Down : MoveDirection.Up
  }

  canPotentiallyAttack(target: Cell) {
    return this.isOneCellForward(target) && this.isDiagonal(target)
  }

  move(target: Cell): void {
    super.move(target)
    this.isFirstMove = false
  }

  canMoveTo(target: Cell): boolean {
    return this.isEmptyForwardCell(target) || this.isDiagonalEnemy(target)
  }

  isEmptyForwardCell(target: Cell) {
    return this.isVerticalMove(target) && this.isOneOrTwoCellsMoveTarget(target) && !target.hasPiece
  }

  isOneOrTwoCellsMoveTarget(target: Cell): boolean {
    return this.isOneCellForward(target) || this.isTwoCellsAwayOnFirstMove(target)
  }

  isOneCellForward(target: Cell) {
    return target.y === this.cell.y + 1 * this.moveDirection 
  }

  isTwoCellsAwayOnFirstMove(target: Cell) {
    return this.isFirstMove && target.y === this.cell.y + 2 * this.moveDirection
  }

  isVerticalMove(target: Cell) {
    return this.cell.x === target.x
  }

  isDiagonalEnemy(target: Cell) {
    return this.isOneCellForward(target) && this.isDiagonal(target) && target.hasEnemyPiece(this.cell)
  }

  isDiagonal(target: Cell) {
    return target.x === this.cell.x - 1 || target.x === this.cell.x + 1
  }
}