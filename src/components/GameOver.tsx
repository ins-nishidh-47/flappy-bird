import React from 'react';

interface GameOverProps {
  score: number;
  bestScore: number;
  onRestart: () => void;
}

export function GameOver({ score, bestScore, onRestart }: GameOverProps) {
  return (
    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
        <p className="text-xl mb-2">Score: {score}</p>
        <p className="text-xl mb-4">Best Score: {bestScore}</p>
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Play Again
        </button>
      </div>
    </div>
  );
}