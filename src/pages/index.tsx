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

    if (board[y][x] !== 0) {
      return;
    }
    const mass = [
      [-1, 1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];
    const Color = turnColor === 1 ? 2 : 1;

    for (let i = 0; i < mass.length; i++) {
      const newx = mass[i][0];
      const newy = mass[i][1];
      let last_x = x + newx;
      let last_y = y + newy;
      let count = 0;

      while (
        last_x >= 0 &&
        last_x <= 7 &&
        last_y >= 0 &&
        last_y <= 7 &&
        newBoard[last_y][last_x] === Color
      ) {
        last_x += newx;
        last_y += newy;
        count++;
      }

      if (
        last_x >= 0 &&
        last_x <= 7 &&
        last_y >= 0 &&
        last_y <= 7 &&
        newBoard[last_y][last_x] === turnColor &&
        count > 0
      ) {
        for (let j = 0; j <= count; j++) {
          newBoard[y + j * newy][x + j * newx] = turnColor;
        }
      }
    }

    setBoard(newBoard);
    setTurnColor(turnColor === 1 ? 2 : 1);
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
