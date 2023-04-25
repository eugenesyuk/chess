import { Board } from './Board'
import { Color, GameEvents, GameOutcome, GameStatus, PieceType } from './Globals'
import { EventsObserver } from './EventObserver'
import { Piece } from './Piece'
import { Cell } from './Cell'

type CheckData = {
  isCheck: boolean,
  chekingPiece: Piece | undefined,
  checkedKing: Piece | undefined,
  canCoverChecked: Piece[]
  canAttackCheckingPiece: Piece[]
  availableCellsToCoverKing : Cell[]
}

export class Game {
  winner: Color | undefined
  outcome: GameOutcome | undefined 
  status: GameStatus | undefined
  board: Board
  check: CheckData = this.checkDefaults()

  constructor() {
    this.board = new Board(this)
  }

  init() {
    this.board.initCells()
    this.board.respawnPieces()
    // this.board.respawnCastling()
    // this.board.respawnPreMate()
    this.status = GameStatus.Initial
    EventsObserver.emit(GameEvents.Init, this)
  }

  finish(outcome: GameOutcome, winner: Color | undefined = undefined) {
    this.status = GameStatus.Finished
    this.outcome = outcome
    this.winner = winner
    EventsObserver.emit(GameEvents.Finished, this)
  }

  subscribeEventHandlers() {
    EventsObserver.on(GameEvents.MoveMade, this.onMoveMade)
  }

  onMoveMade = (movedPiece: Piece) => {
    this.onFirstMove()
    this.checkMoveOutcome(movedPiece)
    this.board.previousMovedPiece = movedPiece
  }

  onFirstMove() {
    if (this.status === GameStatus.Initial) {
      this.status = GameStatus.Started
      EventsObserver.emit(GameEvents.Started, this)
    }
  }

  checkMoveOutcome(movedPiece: Piece) {
    const checkedKing = this.board.getCheckedKing()
  
    if (checkedKing) {
      const kingsAvailableCells = checkedKing.getAvailableCells()
      const checkingPiece = checkedKing.getAttackingPieces()[0]
      const canAttackCheckingPiece = this.board.getSome((piece) => !piece.is(PieceType.King) && piece.isEnemyTo(checkingPiece) && piece.canPotentiallyAttack(checkingPiece.cell))
      const canCoverChecked = this.board.getCanCoverKingPieces(checkingPiece, checkedKing)

      this.check.isCheck = true
      this.check.checkedKing = checkedKing
      this.check.chekingPiece = checkingPiece
      this.check.canAttackCheckingPiece = canAttackCheckingPiece
      this.check.canCoverChecked = canCoverChecked

      console.log({ kingsAvailableCells, canAttackCheckingPiece, canCoverChecked })

      if (!kingsAvailableCells.length && !canAttackCheckingPiece.length && !canCoverChecked.length) {
        this.finish(GameOutcome.Checkmate, movedPiece.color)
      }
    } else {
      this.check = this.checkDefaults()
    }
  }

  checkDefaults(): CheckData {
    return {
      isCheck: false,
      canCoverChecked: [],
      canAttackCheckingPiece: [],
      availableCellsToCoverKing : [],
      chekingPiece: undefined,
      checkedKing: undefined
    }
  }
}