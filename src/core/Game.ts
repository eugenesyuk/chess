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

  finish() {
    this.status = GameStatus.Finished
    EventsObserver.emit(GameEvents.Finished, this)
  }

  subscribeEventHandlers() {
    EventsObserver.on(GameEvents.MoveMade, this.checkOutcome)
  }

  checkOutcome(movedPiece: Piece) {}
}