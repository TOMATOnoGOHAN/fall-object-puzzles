import { BLOCK, BlockCell, BlockType } from "../components/Block";

export function rotateMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, i) => matrix.map((row) => row[i])).reverse();
}

export function checkCollision(
  x: number,
  y: number,
  block: { shape: BlockCell[][] },
  gridSize: { cols: number; rows: number }
): boolean {
  return block.shape.some((row: number[], rowIndex: number) => {
    return row.some((cell: number, colIndex: number) => {
      return (
        cell === BlockCell.FILLED &&
        (y + rowIndex >= gridSize.rows || x + colIndex < 0 || x + colIndex >= gridSize.cols)
      );
    });
  });
}

export function getBlock(key: BlockType): { shape: BlockCell[][]; color: number } {
  return BLOCK[key];
}

export function getRandomBlock(): { shape: BlockCell[][]; color: number } {
  const keys = Object.keys(BLOCK) as BlockType[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return BLOCK[randomKey];
}
