import { rotateMatrix, rotateMatrixCcw, getRandomBlock } from '../utils/BlockUtils'
import { Colors } from '../constants/Color'
import { GridManager } from '../controllers/GridManager'
import Phaser from 'phaser'
import { ScoreManager } from './ScoreManager'

export class BlockController {
  private scene: Phaser.Scene
  private gridManager: GridManager
  private scoreManager: ScoreManager
  private currentBlock!: { shape: number[][]; color: number }
  private currentX!: number
  private currentY!: number

  private gracePeriodMs = 500
  private isLanding = false

  constructor(scene: Phaser.Scene, gridManager: GridManager, scoreManager: ScoreManager) {
    this.scene = scene
    this.gridManager = gridManager
    this.scoreManager = scoreManager
  }

  public spawnBlock(): void {
    this.currentBlock = getRandomBlock()
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
      if (!this.isLanding) {
        this.isLanding = true
        this.scene.time.delayedCall(
          this.gracePeriodMs,
          () => {
            if (this.gridManager.checkCollision(this.currentX, this.currentY + 1, this.currentBlock)) {
              this.gridManager.fixBlock(this.currentX, this.currentY, this.currentBlock)
              const linesCleared = this.gridManager.clearLines()
              this.scoreManager.updateScore(linesCleared)
              this.spawnBlock()
            }
            this.isLanding = false
          },
          [],
          this
        )
      }
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
    const wallKickOffsets = this.getWallKickOffsets(true)

    for (const offset of wallKickOffsets) {
      const newX = this.currentX + offset.x
      const newY = this.currentY + offset.y

      if (!this.gridManager.checkCollision(newX, newY, { shape: rotatedShape })) {
        this.clearBlock()
        this.currentX = newX
        this.currentY = newY
        this.currentBlock.shape = rotatedShape
        this.drawBlock()
        return
      }
    }
  }

  public rotateCcw(): void {
    const rotatedShape = rotateMatrixCcw(this.currentBlock.shape)
    const wallKickOffsets = this.getWallKickOffsets(false)

    for (const offset of wallKickOffsets) {
      const newX = this.currentX + offset.x
      const newY = this.currentY + offset.y

      if (!this.gridManager.checkCollision(newX, newY, { shape: rotatedShape })) {
        this.clearBlock()
        this.currentX = newX
        this.currentY = newY
        this.currentBlock.shape = rotatedShape
        this.drawBlock()
        return
      }
    }
  }

  /** スーパーローテーション用のオフセット */
  // prettier-ignore
  private getWallKickOffsets(isClockwise: boolean): { x: number, y: number }[] {
    const isIBlock = this.currentBlock.shape.length === 1 || this.currentBlock.shape[0].length === 4;
    if (isIBlock) {
      return isClockwise
        ? [{ x: 0, y: 0 }, { x: -2, y: 0 }, { x: 1, y: 0 }, { x: -2, y: -1 }, { x: 1, y: 2 }]
        : [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 1, y: -2 }, { x: -2, y: 1 }];
    } else {
      return isClockwise
        ? [{ x: 0, y: 0 }, { x: -1, y: 0 }, { x: -1, y: -1 }, { x: 0, y: 2 }, { x: -1, y: 2 }]
        : [{ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: -2 }, { x: 1, y: -2 }];
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
