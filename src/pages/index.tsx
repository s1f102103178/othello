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
    const inbox_1 = [];
    const inbox_2 = [];
    if (board[y][x] === 0) {
      for (let a = -1; a < 2; a++) {
        for (let b = -1; b < 2; b++) {
          let new_y = y + a;
          let new_x = x + b;
          {
            for (let c = 0; c <= 7; c++) {
              if (
                board[new_y] === undefined ||
                board[new_y][new_x] === undefined ||
                board[new_y][new_x] === 0 ||
                board[new_y][new_x] === 3
              ) {
                inbox_1.length = 0;
                break;
              } else if (board[new_y][new_x] === turnColor) {
                break;
              } else {
                inbox_1.push([new_y, new_x]);
                new_y += a;
                new_x += b;
              }
            }
            if (inbox_1.length > 0) {
              inbox_1.forEach(([new_y, new_x]) => {
                newBoard[new_y][new_x] = turnColor;
              });
            }
            if (inbox_1.length) {
              //
            }
          }
        }
      }
    }
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
