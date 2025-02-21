import { Colors } from '../constants/Color'

export enum BlockCell {
  EMPTY = 0,
  FILLED = 1
}

export enum BlockType {
  I = 'I',
  O = 'O',
  T = 'T',
  L = 'L',
  J = 'J',
  S = 'S',
  Z = 'Z'
}

interface BlockDefinition {
  shape: BlockCell[][]
  color: number
}

export const BLOCK: Record<BlockType, BlockDefinition> = {
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
