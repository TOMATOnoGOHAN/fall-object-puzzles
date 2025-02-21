export class ScoreManager {
  private score: number = 0
  private level: number = 1
  private dropInterval: number = 500

  updateScore(linesCleared: number): void {
    if (linesCleared > 0) {
      this.score += linesCleared * 100
      if (this.score >= this.level * 500) {
        this.level++
        this.dropInterval = Math.max(100, this.dropInterval - 50)
      }
    }
  }

  getScore(): number {
    return this.score
  }

  getLevel(): number {
    return this.level
  }

  getDropInterval(): number {
    return this.dropInterval
  }
}
