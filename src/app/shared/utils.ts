export function shuffleArray(array: string[]): string[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function calculateTakenTimeOnQuiz(startTime: number): number {
  return parseFloat(((Date.now() - startTime) / 1000).toFixed(1));
}
