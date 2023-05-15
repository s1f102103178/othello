import { useState } from 'react';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const x_new = x + i;
        const y_new = y + j;
        if (
          board[y_new]?.[x_new] !== undefined &&
          board[y_new][x_new] !== 0 &&
          board[y_new][x_new] !== turnColor
        ) {
          while (
            board[y_new]?.[x_new] !== undefined &&
            board[y_new][x_new] !== 0 &&
            board[y_new][x_new] !== turnColor
          ) {}
        }
      }
    }

    if (board[y + 1] !== undefined && board[y + 1][x] !== 0 && board[y + 1][x] !== turnColor) {
      newBoard[y][x] = turnColor;
      setTurnColor(2 / turnColor);
    }
    setBoard(newBoard);
  };
  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <div className={styles.cell} key={`${x}-${y}`} onClick={() => onClick(x, y)}>
              {color !== 0 && (
                <div
                  className={styles.stone}
                  style={{ background: color === 1 ? `#000` : `#fff` }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
