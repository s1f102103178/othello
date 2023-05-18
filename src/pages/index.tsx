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
  const [turnNumber, setTurnNumber] = useState(1);
  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    const inbox = [];
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
                inbox.length = 0;
                break;
              } else if (board[new_y][new_x] === turnColor) {
                break;
              } else {
                inbox.push([new_y, new_x]);
                new_y += a;
                new_x += b;
              }
            }
            if (inbox.length > 0) {
              for (const [new_y, new_x] of inbox) {
                newBoard[new_y][new_x] = turnColor;
                setBoard(newBoard);
              }
              setTurnNumber(turnNumber + 1);
              console.log(turnNumber, `ターン目`);
              setTurnColor(2 / turnColor);
            }
            newBoard[y][x] = turnColor;
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
      <div className={styles.turn}>今は{turnNumber}ターン目</div>
    </div>
  );
};

export default Home;
