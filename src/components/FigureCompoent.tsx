import { FC } from 'react'
import { FigureName } from '../core/Enums'
import { Figure } from '../core/Figure'
import { classnames } from '../core/Utils'
import { BishopSprite, KingSprite, KnightSprite, PawnSprite, QueenSprite, RookSprite } from '../sprites'

interface FirugeProps {
  figure: Figure
}

const getFigureSVG = (name: string) => {
  switch (name) {
    case FigureName.King:
      return <KingSprite />
    case FigureName.Queen:
      return <QueenSprite />
    case FigureName.Bishop:
      return <BishopSprite />
    case FigureName.Knight:
      return <KnightSprite />
    case FigureName.Rook:
      return <RookSprite />
    case FigureName.Pawn:
      return <PawnSprite />
    default:
      return <PawnSprite />
  }
}

export const FigureComponent: FC<FirugeProps> = ({ figure }) => {
  const FigureSprite = getFigureSVG(figure.name)

  return <figure className={classnames('figure', figure.name, figure.color)}>{FigureSprite}</figure>
}
