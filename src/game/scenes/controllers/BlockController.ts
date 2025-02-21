import { rotateMatrix, getBlock } from '../utils/BlockUtils'
import { Colors } from '../constants/Color'
import { GridManager } from '../controllers/GridManager'
import Phaser from 'phaser'
import { ScoreManager } from './ScoreManager'
import { BlockType } from '../components/Block'

export class BlockController {
  private scene: Phaser.Scene
  private gridManager: GridManager
  private scoreManager: ScoreManager
  private currentBlock!: { shape: number[][]; color: number }
  private currentX!: number
  private currentY!: number

  private choiceBlock: number = 0
  private BLOCK_LIST: BlockType[] = [
    BlockType.I,
    BlockType.T,
    BlockType.J,
    BlockType.L,
    BlockType.O,
    BlockType.T,
    BlockType.S,
    BlockType.Z
  ]

  constructor(scene: Phaser.Scene, gridManager: GridManager, scoreManager: ScoreManager) {
    this.scene = scene
    this.gridManager = gridManager
    this.scoreManager = scoreManager
  }

  public spawnBlock(): void {
    this.currentBlock = getBlock(this.BLOCK_LIST[this.choiceBlock])
    this.choiceBlock = (this.choiceBlock + 1) % this.BLOCK_LIST.length
    this.currentX = 4
    this.currentY = 0

    if (this.isGameOver()) {
      return
    }

    this.drawBlock()
  }

  private isGameOver(): boolean {
    if (this.gridManager.checkCollision(this.currentX, this.currentY, this.currentBlock)) {
      this.scene.add.text(64, 240, 'Game Over', { fontSize: '32px', color: Colors.TEXT.GAME_OVER })
      this.scene.scene.pause()
      return true
    }
    return false
  }

  public drop(): void {
    while (!this.gridManager.checkCollision(this.currentX, this.currentY + 1, this.currentBlock)) {
      this.currentY++
    }
    this.gridManager.fixBlock(this.currentX, this.currentY, this.currentBlock)
    const linesCleared = this.gridManager.clearLines()
    this.scoreManager.updateScore(linesCleared)
    this.spawnBlock()
  }

  public moveDown(): void {
    if (this.gridManager.checkCollision(this.currentX, this.currentY + 1, this.currentBlock)) {
      this.gridManager.fixBlock(this.currentX, this.currentY, this.currentBlock)
      const linesCleared = this.gridManager.clearLines()
      this.scoreManager.updateScore(linesCleared)
      this.spawnBlock()
      return
    }
    this.clearBlock()
    this.currentY++
    this.drawBlock()
  }

  public moveLeft(): void {
    if (!this.gridManager.checkCollision(this.currentX - 1, this.currentY, this.currentBlock)) {
      this.clearBlock()
      this.currentX--
      this.drawBlock()
    }
  }

  public moveRight(): void {
    if (!this.gridManager.checkCollision(this.currentX + 1, this.currentY, this.currentBlock)) {
      this.clearBlock()
      this.currentX++
      this.drawBlock()
    }
  }

  public rotate(): void {
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
          this.drawBlockCell(this.currentX + colIndex, this.currentY + rowIndex, this.currentBlock.color)
        }
      })
    })
  }

  private clearBlock(): void {
    this.currentBlock.shape.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell === 1) {
          this.drawBlockCell(this.currentX + colIndex, this.currentY + rowIndex, Colors.BACKGROUND)
        }
      })
    })
  }

  private drawBlockCell(x: number, y: number, color: number): void {
    this.scene.add
      .rectangle(
        x * this.gridManager.gridSize.cellSize,
        y * this.gridManager.gridSize.cellSize,
        this.gridManager.gridSize.cellSize,
        this.gridManager.gridSize.cellSize,
        color
      )
      .setOrigin(0, 0)
      .setStrokeStyle(1, Colors.BORDER)
  }
}
