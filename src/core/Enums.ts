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

export enum MoveDirection {
  Up = -1,
  Down = 1
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