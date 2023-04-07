import { FC } from 'react'
import { PieceType } from '../core/Enums'
import { Piece } from '../core/Piece'
import { classnames } from '../core/Utils'
import { BishopSprite, KingSprite, KnightSprite, PawnSprite, QueenSprite, RookSprite } from '../sprites'

interface PieceProps {
  piece: Piece
}

const getPieceSVG = (name: string) => {
  switch (name) {
    case PieceType.King:
      return <KingSprite />
    case PieceType.Queen:
      return <QueenSprite />
    case PieceType.Bishop:
      return <BishopSprite />
    case PieceType.Knight:
      return <KnightSprite />
    case PieceType.Rook:
      return <RookSprite />
    case PieceType.Pawn:
      return <PawnSprite />
    default:
      return <PawnSprite />
  }
}

export const PieceComponent: FC<PieceProps> = ({ piece }) => {
  const PieceSprite = getPieceSVG(piece.name)

  return <figure className={classnames('piece', piece.name, piece.color)}>{PieceSprite}</figure>
}
