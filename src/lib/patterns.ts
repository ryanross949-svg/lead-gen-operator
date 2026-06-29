// src/lib/patterns.ts

export function detectPatterns(text: string[]): string[] {
  const wordCounts: { [key: string]: number } = {};
  const stopWords = new Set(["the", "a", "to", "and", "i", "it", "was", "is", "for", "in", "on", "they", "he", "she", "but", "my", "of", "that", "this", "so", "not", "if", "just", "lmk", "like"]);

  text.forEach(sentence => {
    const words = sentence.toLowerCase().replace(/[^\w\s]/g, "").split(/\s+/);
    words.forEach(word => {
      if (word.length > 3 && !stopWords.has(word)) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }
    });
  });

  return Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([word, count]) => `${word} (${count}x)`);
}