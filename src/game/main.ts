import Phaser from 'phaser'
import MainScene from './scenes/MainScene'

// Phaserの設定管理とエントリーポイント
const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 300,
  height: 600,
  parent: 'game-container',
  backgroundColor: '#000',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0,
        x: 0
      }
    }
  },
  scene: [MainScene]
}

const StartGame = (parent: string) => {
  return new Phaser.Game({ ...config, parent })
}

export default StartGame
