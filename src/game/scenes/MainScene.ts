import Phaser from 'phaser'
import { GridManager } from './controllers/GridManager'
import { BlockController } from './controllers/BlockController'
import { ScoreManager } from './controllers/ScoreManager'

export default class MainScene extends Phaser.Scene {
  private gridManager!: GridManager
  private blockController!: BlockController
  private scoreManager!: ScoreManager
  private lastDropTime: number = 0
  private readonly defaultDropInterval: number = 500
  private bgm!: Phaser.Sound.BaseSound

  public getBgm(): Phaser.Sound.BaseSound {
    return this.bgm
  }

  constructor() {
    super('MainScene')
  }

  public preload(): void {
    this.load.audio('bgm', 'assets/audio/music.mp3')
  }

  public create(): void {
    this.initializeManagers()
    this.setupControls()
    this.blockController.spawnBlock()

    // BGM を再生
    this.bgm = this.sound.add('bgm', { loop: true, volume: 0.5 })
    this.bgm.play()
  }

  private initializeManagers(): void {
    this.gridManager = new GridManager(this)
    this.scoreManager = new ScoreManager()
    this.blockController = new BlockController(this, this.gridManager, this.scoreManager)
  }

  private setupControls(): void {
    const keyMappings: { [key: string]: () => void } = {
      LEFT: () => this.blockController.moveLeft(),
      RIGHT: () => this.blockController.moveRight(),
      SPACE: () => this.blockController.rotate(),
      SHIFT: () => this.blockController.rotateCcw(),
      DOWN: () => this.blockController.moveDown(),
      UP: () => this.blockController.drop()
    }

    Object.keys(keyMappings).forEach((key) => {
      this.input.keyboard?.on(`keydown-${key}`, keyMappings[key])
    })
  }

  public update(time: number): void {
    if (this.shouldDropBlock(time)) {
      this.lastDropTime = time
      this.blockController.moveDown()
    }
  }

  private shouldDropBlock(time: number): boolean {
    const dropInterval = Math.max(100, this.defaultDropInterval - this.scoreManager.getLevel() * 50)
    return time - this.lastDropTime > dropInterval
  }
}
