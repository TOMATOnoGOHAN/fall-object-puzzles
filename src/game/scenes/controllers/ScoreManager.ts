export class ScoreManager {
  private score: number = 0
  private level: number = 1
  private dropInterval: number = 500

  private readonly levelThreshold: number = 500
  private readonly minDropInterval: number = 100
  private readonly dropIntervalReduction: number = 50
  private readonly scorePerLine: number = 100

  public updateScore(linesCleared: number): void {
    if (linesCleared > 0) {
      this.incrementScore(linesCleared)
      this.checkLevelUp()
    }
  }

  private incrementScore(linesCleared: number): void {
    this.score += linesCleared * this.scorePerLine
  }

  private checkLevelUp(): void {
    if (this.score >= this.level * this.levelThreshold) {
      this.level++
      this.dropInterval = Math.max(this.minDropInterval, this.dropInterval - this.dropIntervalReduction)
    }
  }

  public getScore(): number {
    return this.score
  }

  public getLevel(): number {
    return this.level
  }

  public getDropInterval(): number {
    return this.dropInterval
  }
}
