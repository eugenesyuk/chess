import { Board } from '../core/Board';
import { FC, createContext, useEffect, useState } from 'react';
import React from 'react';
import { CellComponent } from '.';
import { Cell } from '../core/Cell';
import { GameStatus, XNotationMap, YNotationMap } from '../core/Globals';

interface BoardProps {
  board: Board;
  rerenderBoard: () => void;
}

export const BoardContext = createContext<any>({});

export const BoardComponent: FC<BoardProps> = ({ board, rerenderBoard }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

  useEffect(() => {
    highlightCells();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCell]);

  const isSelected = (cell: Cell): boolean => {
    return cell.x === selectedCell?.x && cell.y === selectedCell?.y;
  };

  const onCellClicked = (clickedCell: Cell) => {
    if (clickedCell.board.game.status === GameStatus.Finished) return;

    if (selectedCell?.piece && isMoveAllowed(clickedCell)) {
      selectedCell.piece.move(clickedCell);
      return setSelectedCell(null);
    }

    clickedCell.hasPiece ? setSelectedCell(clickedCell) : setSelectedCell(null);
  };

  const isMoveAllowed = (target: Cell) => {
    return selectedCell !== target && selectedCell?.piece?.canMove(target);
  };

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    rerenderBoard();
  };

  return (
    <BoardContext.Provider value={{ rerenderBoard, selectedCell, setSelectedCell }}>
      <div className='frame'>
        <BoardLabels />
        <div className='board'>
          {board.cells.map((row, index) => (
            <React.Fragment key={index}>
              {row.map((cell) => (
                <CellComponent
                  cell={cell}
                  key={cell.id}
                  clickHandler={onCellClicked}
                  isSelected={isSelected(cell)}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </BoardContext.Provider>
  );
};

const BoardLabels = () => (
  <>
    <div className='labels top'>
      {Array.from(XNotationMap).map(([letter]) => (
        <span key={letter}>{letter.toUpperCase()}</span>
      ))}
    </div>

    <div className='labels right'>
      {Array.from(YNotationMap).map(([digit]) => (
        <span key={digit}>{digit.toUpperCase()}</span>
      ))}
    </div>

    <div className='labels bottom'>
      {Array.from(XNotationMap).map(([letter]) => (
        <span key={letter}>{letter.toUpperCase()}</span>
      ))}
    </div>

    <div className='labels left'>
      {Array.from(YNotationMap).map(([digit]) => (
        <span key={digit}>{digit.toUpperCase()}</span>
      ))}
    </div>
  </>
);
