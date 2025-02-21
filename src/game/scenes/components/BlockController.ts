import { getRandomBlock } from './Block'
import { rotateMatrix } from './BlockUtils'
import { GridManager } from './GridManager'
import Phaser from 'phaser'

export class BlockController {
  private scene: Phaser.Scene
  private gridManager: GridManager
  private currentBlock!: { shape: number[][]; color: number }
  private currentX!: number
  private currentY!: number

  private dropInterval: number = 500
  private level: number = 1
  private score: number = 0

  constructor(scene: Phaser.Scene, gridManager: GridManager) {
    this.scene = scene
    this.gridManager = gridManager
  }

  spawnBlock(): void {
    this.currentBlock = getRandomBlock()
    this.currentX = 4
    this.currentY = 0
    if (this.gridManager.checkCollision(this.currentX, this.currentY, this.currentBlock)) {
      this.scene.add.text(64, 240, 'Game Over', { fontSize: '32px', color: '#ff0000' })
      this.scene.scene.pause()
      return
    }
    this.drawBlock()
  }

  drop(): void {
    while (!this.gridManager.checkCollision(this.currentX, this.currentY + 1, this.currentBlock)) {
      this.currentY++
    }

    this.gridManager.fixBlock(this.currentX, this.currentY, this.currentBlock)
    this.clearAndCheckLines()
    this.spawnBlock()
  }

  private clearAndCheckLines(): void {
    const linesCleared = this.gridManager.clearLines()
    if (linesCleared > 0) {
      this.score += linesCleared * 100
      if (this.score >= this.level * 500) {
        this.level++
        this.dropInterval = Math.max(100, this.dropInterval - 50)
      }
    }
  }

  moveDown(): void {
    if (this.gridManager.checkCollision(this.currentX, this.currentY + 1, this.currentBlock)) {
      this.gridManager.fixBlock(this.currentX, this.currentY, this.currentBlock)
      const linesCleared = this.gridManager.clearLines()
      if (linesCleared > 0) {
        this.score += linesCleared * 100
        if (this.score >= this.level * 500) {
          this.level++
          this.dropInterval = Math.max(100, this.dropInterval - 50)
        }
      }
      this.spawnBlock()
      return
    }

    this.clearBlock()
    this.currentY++
    this.drawBlock()
  }

  moveLeft(): void {
    if (!this.gridManager.checkCollision(this.currentX - 1, this.currentY, this.currentBlock)) {
      this.clearBlock()
      this.currentX--
      this.drawBlock()
    }
  }

  moveRight(): void {
    if (!this.gridManager.checkCollision(this.currentX + 1, this.currentY, this.currentBlock)) {
      this.clearBlock()
      this.currentX++
      this.drawBlock()
    }
  }

  rotate(): void {
    const rotatedShape = rotateMatrix(this.currentBlock.shape)

    if (!this.gridManager.checkCollision(this.currentX, this.currentY, { shape: rotatedShape })) {
      this.clearBlock()
      this.currentBlock.shape = rotatedShape
      this.drawBlock()
    }
  }

  private drawBlock(): void {
    this.currentBlock.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          this.scene.add
            .rectangle(
              (this.currentX + colIndex) * this.gridManager.getSize().cellSize,
              (this.currentY + rowIndex) * this.gridManager.getSize().cellSize,
              this.gridManager.getSize().cellSize,
              this.gridManager.getSize().cellSize,
              this.currentBlock.color
            )
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0xffffff)
        }
      })
    })
  }

  private clearBlock(): void {
    this.currentBlock.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          this.scene.add
            .rectangle(
              (this.currentX + colIndex) * this.gridManager.getSize().cellSize,
              (this.currentY + rowIndex) * this.gridManager.getSize().cellSize,
              this.gridManager.getSize().cellSize,
              this.gridManager.getSize().cellSize,
              0x444444
            )
            .setOrigin(0, 0)
            .setStrokeStyle(1, 0xffffff)
        }
      })
    })
  }
  getScore(): number {
    return this.score
  }

  getLevel(): number {
    return this.level
  }
}
