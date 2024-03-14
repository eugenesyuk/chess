import { Color, PieceType, MoveDirection } from '../Globals';
import { Piece } from '../Piece';
import { Cell } from '../Cell';

export class Pawn extends Piece {
  isFirstMove: boolean = true
  moveDirection: MoveDirection
  oppositeMoveDirection: MoveDirection

  constructor(color: Color, cell: Cell) {
    super(color, cell, PieceType.Pawn)
    this.moveDirection = color === Color.Black ? MoveDirection.Down : MoveDirection.Up
    this.oppositeMoveDirection = this.moveDirection === MoveDirection.Down ? MoveDirection.Up : MoveDirection.Down
  }

  canPotentiallyAttack(target: Cell) {
    return this.isOneCellForward(target) && this.isDiagonal(target)
  }

  move(target: Cell): void {
    const isEnPassant = this.isEnPassant(target)
    super.move(target)
    if (isEnPassant) {
      const forwardAdjacentCell = this.getForwardAdjacentCell(target)
      forwardAdjacentCell.piece?.capture()
      forwardAdjacentCell.piece = null
    }
    this.isFirstMove = false
  }

  canMoveTo(target: Cell): boolean {
    return this.isEmptyForwardCell(target) || this.isDiagonalEnemy(target) || this.isEnPassant(target)
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

  isEnPassant(target: Cell): boolean {
    return this.isOneCellForward(target) && this.isDiagonal(target) && this.hasPreviuslyMovedEnemyPawnInFront(target)
  }

  hasPreviuslyMovedEnemyPawnInFront(target: Cell): boolean {
    const forwardAdjacentCell = this.getForwardAdjacentCell(target)
    if (!forwardAdjacentCell.piece) return false
    
    const hasEnemyPawn = forwardAdjacentCell.hasEnemyPiece(this.cell) && forwardAdjacentCell.piece.is(PieceType.Pawn)
    const twoCellsBackY = forwardAdjacentCell.y + 2 * this.moveDirection

    if(twoCellsBackY < 0 || twoCellsBackY > 7) return false

    const twoCellsBack = forwardAdjacentCell.board.cell(twoCellsBackY, forwardAdjacentCell.x)
    const wasTwoCellsInitialMove = forwardAdjacentCell.piece?.previousCell === twoCellsBack
    const wasPreviousMove = this.cell.board.previousMovedPiece === forwardAdjacentCell.piece

    return hasEnemyPawn && wasTwoCellsInitialMove && wasPreviousMove
  }

  getForwardAdjacentCell(target: Cell) {
    return target.board.cell(target.y + 1 * this.oppositeMoveDirection, target.x)
  }
}