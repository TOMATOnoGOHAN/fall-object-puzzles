export function rotateMatrix(matrix: number[][]): number[][] {
  return matrix[0].map((_, index) => matrix.map((row) => row[index]).reverse())
}

export function checkCollision(
  x: number,
  y: number,
  block: { shape: number[][] },
  gridSize: { cols: number; rows: number }
): boolean {
  return block.shape.some((row: number[], rowIndex: number) => {
    return row.some((cell: number, colIndex: number) => {
      return cell === 1 && (y + rowIndex >= gridSize.rows || x + colIndex < 0 || x + colIndex >= gridSize.cols)
    })
  })
}
