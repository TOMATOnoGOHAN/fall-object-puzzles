import Phaser from 'phaser'
import { Colors } from '../constants/Color'

export class GridManager {
  private scene: Phaser.Scene
  private grid: number[][]
  public readonly gridSize = { cols: 10, rows: 20, cellSize: 30 }

  constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.grid = Array.from({ length: this.gridSize.rows }, () => Array(this.gridSize.cols).fill(0))
    this.drawGrid()
  }

  fixBlock(x: number, y: number, block: { shape: number[][]; color: number }) {
    block.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          const gridX = x + colIndex
          const gridY = y + rowIndex

          if (gridY < this.gridSize.rows) {
            this.grid[gridY][gridX] = block.color
          }
        }
      })
    })
    this.drawGrid()
  }

  private drawGrid(): void {
    this.scene.children.removeAll()

    for (let i = 0; i < this.gridSize.cols; i++) {
      for (let j = 0; j < this.gridSize.rows; j++) {
        const color = this.grid[j][i] === 0 ? Colors.BACKGROUND : this.grid[j][i]

        this.scene.add
          .rectangle(
            i * this.gridSize.cellSize,
            j * this.gridSize.cellSize,
            this.gridSize.cellSize,
            this.gridSize.cellSize,
            color
          )
          .setOrigin(0, 0)
          .setStrokeStyle(1, Colors.BORDER)
      }
    }
  }

  checkCollision(x: number, y: number, block: { shape: number[][] }): boolean {
    return block.shape.some((row, rowIndex) => {
      return row.some((cell, colIndex) => {
        if (cell === 1) {
          const gridX = x + colIndex
          const gridY = y + rowIndex
          return (
            gridY >= this.gridSize.rows || // 地面に到達
            gridX < 0 ||
            gridX >= this.gridSize.cols || // 左右の壁に衝突
            this.grid[gridY]?.[gridX] !== 0 // すでに固定されているブロックに衝突
          )
        }
        return false
      })
    })
  }

  clearLines(): number {
    let linesCleared = 0
    this.grid = this.grid.filter((row) => {
      if (row.every((cell) => cell !== 0)) {
        linesCleared++
        return false
      }
      return true
    })

    while (this.grid.length < this.gridSize.rows) {
      this.grid.unshift(Array(this.gridSize.cols).fill(0))
    }

    this.drawGrid()
    return linesCleared
  }
}
