import { Colors } from '../constants/Color'

export enum BlockCell {
  EMPTY = 0,
  FILLED = 1
}

export type BlockType = 'I' | 'O' | 'T' | 'L' | 'J' | 'S' | 'Z'

export const BLOCK: Record<BlockType, { shape: BlockCell[][]; color: number }> = {
  I: { shape: [[1, 1, 1, 1]], color: Colors.BLOCKS.I },
  O: {
    shape: [
      [1, 1],
      [1, 1]
    ],
    color: Colors.BLOCKS.O
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ],
    color: Colors.BLOCKS.T
  },
  L: {
    shape: [
      [1, 0],
      [1, 0],
      [1, 1]
    ],
    color: Colors.BLOCKS.L
  },
  J: {
    shape: [
      [0, 1],
      [0, 1],
      [1, 1]
    ],
    color: Colors.BLOCKS.J
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ],
    color: Colors.BLOCKS.S
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ],
    color: Colors.BLOCKS.Z
  }
}
