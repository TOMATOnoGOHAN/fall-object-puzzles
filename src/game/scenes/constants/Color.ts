export const Colors = {
  TEXT: {
    GAME_OVER: '#ff0000'
  },
  BACKGROUND: 0x444444,
  BORDER: 0xffffff,
  BLOCKS: {
    I: 0x00b2b2,
    O: 0xe6c200,
    T: 0x6a2976,
    L: 0xd17a00,
    J: 0x2a4bd7,
    S: 0x3da35d,
    Z: 0xb22222
  }
} as const

type BlockColorKeys = keyof typeof Colors.BLOCKS

export function getBlockColor(type: BlockColorKeys): number {
  return Colors.BLOCKS[type]
}
