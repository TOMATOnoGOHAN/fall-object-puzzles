import Phaser from 'phaser'
import { Colors } from '../constants/Color'
import MainScene from '../MainScene'

export class GridManager {
  private scene: Phaser.Scene
  private grid: number[][]
  public readonly gridSize = { cols: 10, rows: 20, cellSize: 30 }

  public constructor(scene: Phaser.Scene) {
    this.scene = scene
    this.grid = this.createEmptyGrid()
    this.drawGrid()
  }

  private createEmptyGrid(): number[][] {
    const rowTemplate = new Array(this.gridSize.cols).fill(0)
    return Array.from({ length: this.gridSize.rows }, () => [...rowTemplate])
  }
  public fixBlock(x: number, y: number, block: { shape: number[][]; color: number }): void {
    let isGameOver = false

    block.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          let cellY = y + rowIndex
          if (cellY < 0) {
            isGameOver = true
          } else {
            this.setGridCell(x + colIndex, cellY, block.color)
          }
        }
      })
    })

    if (isGameOver) {
      this.scene.add.text(160, 240, 'Game Over', { fontSize: '32px', color: '#ff0000' }).setOrigin(0.5).setDepth(10)
      const mainScene = this.scene as MainScene
      mainScene.getBgm().stop()
      this.scene.scene.pause()
      return
    }

    this.drawGrid()
  }

  private setGridCell(x: number, y: number, color: number): void {
    if (y < this.gridSize.rows) {
      this.grid[y][x] = color
    }
  }

  private drawGrid(): void {
    this.scene.children.each((child) => {
      if (!(child instanceof Phaser.GameObjects.Text)) {
        child.destroy()
      }
    })
    for (let i = 0; i < this.gridSize.cols; i++) {
      for (let j = 0; j < this.gridSize.rows; j++) {
        this.drawGridCell(i, j, this.grid[j][i])
      }
    }
  }

  private drawGridCell(x: number, y: number, color: number): void {
    const fillColor = color === 0 ? Colors.BACKGROUND : color
    this.scene.add
      .rectangle(
        x * this.gridSize.cellSize,
        y * this.gridSize.cellSize,
        this.gridSize.cellSize,
        this.gridSize.cellSize,
        fillColor
      )
      .setOrigin(0, 0)
      .setStrokeStyle(1, Colors.BORDER)
  }

  public checkCollision(x: number, y: number, block: { shape: number[][] }): boolean {
    return block.shape.some((row, rowIndex) =>
      row.some((cell, colIndex) => cell === 1 && this.isCellOccupied(x + colIndex, y + rowIndex))
    )
  }

  private isCellOccupied(x: number, y: number): boolean {
    if (y < 0) return false
    return y >= this.gridSize.rows || x < 0 || x >= this.gridSize.cols || this.grid[y]?.[x] !== 0
  }

  public clearLines(): number {
    const newGrid = this.grid.filter((row) => !row.every((cell) => cell !== 0))
    const linesCleared = this.gridSize.rows - newGrid.length

    while (newGrid.length < this.gridSize.rows) {
      newGrid.unshift(Array(this.gridSize.cols).fill(0))
    }

    this.grid = newGrid
    this.drawGrid()
    return linesCleared
  }
}
