import Phaser from 'phaser'

export const BLOCK: { [key: string]: number[][] } = {
  I: [[1, 1, 1, 1]],
  O: [
    [1, 1],
    [1, 1]
  ],
  T: [
    [0, 1, 0],
    [1, 1, 1]
  ],
  L: [
    [1, 0],
    [1, 0],
    [1, 1]
  ],
  J: [
    [0, 1],
    [0, 1],
    [1, 1]
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0]
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1]
  ]
}

export function getRandomBlock(): { shape: number[][]; color: number } {
  const keys: string[] = Object.keys(BLOCK)
  const randomKey: string = keys[Math.floor(Math.random() * keys.length)]
  return {
    shape: BLOCK[randomKey],
    color: Phaser.Display.Color.RandomRGB().color
  }
}
