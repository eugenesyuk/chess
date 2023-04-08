import { Board } from './Board'
import { GameEvents, GameOutcome, GameStatus } from './Globals'
import { EventsObserver } from './EventObserver'
import { Piece } from './Piece'

export class Game {
  outcome: GameOutcome | undefined 
  status: GameStatus = GameStatus.Initial
  board: Board

  constructor() {
    this.board = new Board(this)
  }

  start() {
    this.board.initCells()
    // this.board.respawnPieces()
    this.board.respawnPreMate()
    this.status = GameStatus.Started

    EventsObserver.emit(GameEvents.Started, this)
  }

  finish() {
    this.status = GameStatus.Finished
    EventsObserver.emit(GameEvents.Finished, this)
  }

  subscribeEventHandlers() {
    EventsObserver.on(GameEvents.MoveMade, this.checkOutcome)
    EventsObserver.on(GameEvents.Started, this.onGameStarted)
    EventsObserver.on(GameEvents.Finished, this.onGameFinished)
  }

  checkOutcome(movedPiece: Piece) {
    console.log({ piece: movedPiece })
  }

  onGameStarted() {
    console.log('Game started')
  }

  onGameFinished() {
    console.log('Game finished')
  }
}