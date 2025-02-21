import Phaser from 'phaser'
import { GridManager } from './components/GridManager'
import { BlockController } from './components/BlockController'

export default class MainScene extends Phaser.Scene {
  private gridManager!: GridManager
  private blockController!: BlockController
  private lastDropTime!: number

  constructor() {
    super('MainScene')
  }

  create(): void {
    // グリッドの管理クラス
    this.gridManager = new GridManager(this)

    // ブロックの制御クラス
    this.blockController = new BlockController(this, this.gridManager)

    // キーボード入力を設定
    this.input.keyboard?.on('keydown-LEFT', () => this.blockController.moveLeft())
    this.input.keyboard?.on('keydown-RIGHT', () => this.blockController.moveRight())
    this.input.keyboard?.on('keydown-SPACE', () => this.blockController.rotate())
    this.input.keyboard?.on('keydown-DOWN', () => this.blockController.moveDown())
    this.input.keyboard?.on('keydown-UP', () => this.blockController.drop())

    // 最初のブロックを生成
    this.blockController.spawnBlock()
  }

  update(time: number): void {
    if (!this.lastDropTime) this.lastDropTime = time

    if (time - this.lastDropTime > 500) {
      this.lastDropTime = time
      this.blockController.moveDown()
    }
  }
}
