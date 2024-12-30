import { useState, useCallback } from 'react';
import { generatePipe } from '../utils/pipeUtils';

export function useGameState() {
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [birdPosition, setBirdPosition] = useState(250);
  const [birdVelocity, setBirdVelocity] = useState(0);
  const [birdRotation, setBirdRotation] = useState(0);
  const [pipes, setPipes] = useState<Array<{ x: number; height: number; passed?: boolean }>>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setIsGameOver(false);
    setBirdPosition(250);
    setBirdVelocity(0);
    setBirdRotation(0);
    setPipes([generatePipe()]);
    setScore(0);
  }, []);

  return {
    gameStarted,
    setGameStarted,
    isGameOver,
    setIsGameOver,
    birdPosition,
    setBirdPosition,
    birdVelocity,
    setBirdVelocity,
    birdRotation,
    setBirdRotation,
    pipes,
    setPipes,
    score,
    setScore,
    bestScore,
    setBestScore,
    startGame
  };
}