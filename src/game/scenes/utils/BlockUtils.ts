import { BLOCK, BlockCell, BlockType } from '../components/Block'

export function rotateMatrix(matrix: number[][]): number[][] {
  const rows = matrix.length
  const cols = matrix[0].length
  const rotated = Array.from({ length: cols }, () => Array(rows))

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      rotated[c][rows - 1 - r] = matrix[r][c]
    }
  }
  return rotated
}

export function checkCollision(
  x: number,
  y: number,
  block: { shape: BlockCell[][] },
  gridSize: { cols: number; rows: number }
): boolean {
  return block.shape.some((row, rowIndex) =>
    row.some((cell, colIndex) => cell === BlockCell.FILLED && isOutOfBounds(x + colIndex, y + rowIndex, gridSize))
  )
}

function isOutOfBounds(x: number, y: number, gridSize: { cols: number; rows: number }): boolean {
  return y >= gridSize.rows || x < 0 || x >= gridSize.cols
}

export function getBlock(key: BlockType): { shape: BlockCell[][]; color: number } {
  return BLOCK[key]
}

export function getRandomBlock(): { shape: BlockCell[][]; color: number } {
  const keys = Object.keys(BLOCK) as BlockType[]
  return BLOCK[keys[Math.floor(Math.random() * keys.length)]]
}
