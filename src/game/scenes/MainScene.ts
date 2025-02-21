import Phaser from 'phaser'
import { GridManager } from './controllers/GridManager'
import { BlockController } from './controllers/BlockController'
import { ScoreManager } from './controllers/ScoreManager'

export default class MainScene extends Phaser.Scene {
  private gridManager!: GridManager
  private blockController!: BlockController
  private scoreManager!: ScoreManager
  private lastDropTime: number = 0

  constructor() {
    super('MainScene')
  }
  create(): void {
    this.gridManager = new GridManager(this)
    this.scoreManager = new ScoreManager()
    this.blockController = new BlockController(this, this.gridManager, this.scoreManager)

    const keyMappings: { [key: string]: () => void } = {
      LEFT: () => this.blockController.moveLeft(),
      RIGHT: () => this.blockController.moveRight(),
      SPACE: () => this.blockController.rotate(),
      DOWN: () => this.blockController.moveDown(),
      UP: () => this.blockController.drop()
    }

    Object.keys(keyMappings).forEach((key) => {
      this.input.keyboard?.on(`keydown-${key}`, keyMappings[key])
    })

    this.blockController.spawnBlock()
  }

  update(time: number): void {
    if (!this.lastDropTime) this.lastDropTime = time

    const dropInterval = Math.max(100, 500 - this.scoreManager.getLevel() * 50)

    if (time - this.lastDropTime > dropInterval) {
      this.lastDropTime = time
      this.blockController.moveDown()
    }
  }
}
