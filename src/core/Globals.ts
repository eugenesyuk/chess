export enum Color {
  White = 'white',
  Black = 'black'
}

export enum PieceType {
  King = 'king',
  Queen = 'queen',
  Bishop = 'bishop',
  Knight = 'knight',
  Rook = 'rook',
  Pawn = 'pawn'
}

export enum StartPosition {
  Top,
  Bottom
}

export enum MoveDirection {
  Up = -1,
  Down = 1,
  Left = -1,
  Right = 1
}

export const XNotationMap = new Map([
  ['a', 0],
  ['b', 1],
  ['c', 2],
  ['d', 3],
  ['e', 4],
  ['f', 5],
  ['g', 6],
  ['h', 7]
])

export const YNotationMap = new Map([
  ['8', 0],
  ['7', 1],
  ['6', 2],
  ['5', 3],
  ['4', 4],
  ['3', 5],
  ['2', 6],
  ['1', 7]
])

export enum GameEvents {
  Init = 'Init',
  Started = 'Started',
  Finished = 'Finished',
  MoveMade = 'MoveMade',
  PiecesRespawned = 'PiecesRespawned'
}

export enum GameOutcome {
  Checkmate = 'Checkmate',
  Resignation = 'Resignation',
  Timeout = 'Timeout',
  Draw = 'Draw'
}

export enum GameStatus {
  Initial = 'Initial',
  Started = 'Started',
  Finished = 'Finished'
}

export enum NodeEnv {
  Development = 'development',
  Prodution = 'production'
}

export const Environment = process.env.NODE_ENV