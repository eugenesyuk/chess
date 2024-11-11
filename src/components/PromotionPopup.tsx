import { FC, useContext, useEffect, useRef } from 'react';
import { Cell } from '../core/Cell';
import { classnames } from '../core/Utils';
import { PieceComponent } from './PieceCompoent';
import { Piece } from '../core/Piece';
import { Color } from '../core/Globals';
import { Queen, Knight, Rook, Bishop, Pawn } from '../core/pieces';
import { BoardContext } from './BoardComponent';

const positions = ['top', 'bottom'];

export const PromotionPopupComponent: FC<{ cell: Cell; piece: Pawn }> = ({ cell, piece }) => {
  const position = cell.y === 0 ? positions[0] : positions[1];
  const color: Color = piece.color;

  const dummyCell = new Cell(cell.board.cells.length + 1, cell.board, -1, -1, Color.White, null);

  const queen = new Queen(color, dummyCell);
  const knight = new Knight(color, dummyCell);
  const rook = new Rook(color, dummyCell);
  const bishop = new Bishop(color, dummyCell);

  const promotionPieces = [queen, knight, rook, bishop];
  const { rerenderBoard } = useContext(BoardContext);

  const promotePiece = (piece: Piece) => {
    piece.cell = cell;
    cell.piece = piece;
    cell.isPromotion = false;
    if(cell.board.game.promotingPiece && cell.board.game.promotingPiece.cell) cell.board.game.promotingPiece.cell.piece = null
    cell.board.game.promotingPiece = null
    piece.pushToBoard();
    rerenderBoard();
  };

  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      cell.board.game.promotingPiece = null;
      cell.isPromotion = false;
      rerenderBoard();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); 
  
  return (
    <div className={classnames('promotion-popup', position)} ref={popupRef}>
      {promotionPieces.map((piece) => (
        <div
          key={piece.id}
          className='selection-square'
          onClick={(e) => {
            e.stopPropagation();
            promotePiece(piece);
          }}
        >
          <PieceComponent piece={piece} />
        </div>
      ))}
    </div>
  );
};
