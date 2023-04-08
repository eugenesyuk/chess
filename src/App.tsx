import { useCallback, useEffect, useState } from 'react'
import { BoardComponent } from './components'
import { Game } from './core/Game'
import './App.scss'

function App() {
  const [, updateState] = useState({});
  const rerenderBoard = useCallback(() => updateState({}), []);

  const [game, setGame] = useState<Game>();

  const createGame = () => {
    const game = new Game();
    setGame(game);
  };

  useEffect(() => {
    createGame();
  }, [])

  useEffect(() => {
    if (game) {
      game.subscribeEventHandlers();
      game.init();
      rerenderBoard();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  return (
      <div className='chess'>
        {game && (
          <BoardComponent board={game.board} rerenderBoard={rerenderBoard} />
        )}
      </div>
  )
}

export default App;
