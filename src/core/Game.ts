import { Board } from './Board'
import { GameEvents, GameOutcome, GameStatus } from './Globals'
import { EventsObserver } from './EventObserver'
import { Piece } from './Piece'

export class Game {
  outcome: GameOutcome | undefined 
  status: GameStatus | undefined
  board: Board

  constructor() {
    this.board = new Board(this)
  }

  init() {
    this.board.initCells()
    // this.board.respawnPieces()
    this.board.respawnPreMate()
    this.status = GameStatus.Initial
    EventsObserver.emit(GameEvents.Init, this)
  }

  finish(outcome: GameOutcome) {
    this.status = GameStatus.Finished
    this.outcome = outcome
    EventsObserver.emit(GameEvents.Finished, this)
  }

  subscribeEventHandlers() {
    EventsObserver.on(GameEvents.MoveMade, this.onMoveMade)
  }

  onMoveMade = (movedPiece: Piece) => {
    this.onFirstMove()
    this.checkOutcome(movedPiece)
  }

  onFirstMove() {
    if (this.status === GameStatus.Initial) {
      this.status = GameStatus.Started
      EventsObserver.emit(GameEvents.Started, this)
    }
  }

  checkOutcome(movedPiece: Piece) {
    const attackedKing = this.board.getCheckedKing()
  
    if (attackedKing) {
      const kingsAvailableCells = attackedKing.getAvailableCells()
      const checkingPiece = attackedKing.getAttackingPieces()[0]
      const canAttackCheckingPiece = this.board.getSome((piece) => piece.isEnemyTo(checkingPiece) && piece.canPotentiallyAttack(checkingPiece.cell))
      const canCoverChecked = this.board.getCanCoverCheckedPieces(checkingPiece, attackedKing)

      console.log({ checkingPiece, canAttackCheckingPiece, canCoverTheWay: canCoverChecked })

      if (!kingsAvailableCells.length && !canAttackCheckingPiece && !canCoverChecked.length) {
        this.finish(GameOutcome.Checkmate)
      }
    }
  }
}