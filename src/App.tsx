import React, { useCallback, useEffect } from 'react';
import { Bird } from './components/Bird';
import { Pipe } from './components/Pipe';
import { GameOver } from './components/GameOver';
import { SkyBackground } from './components/SkyBackground';
import { useGameLoop } from './hooks/useGameLoop';
import { useGameState } from './hooks/useGameState';
import { generatePipe } from './utils/pipeUtils';
import { GRAVITY, JUMP_FORCE, PIPE_SPEED, PIPE_SPACING, GAP_SIZE, BIRD_SIZE, PIPE_WIDTH, BIRD_X } from './constants/gameConfig';

export default function App() {
  const {
    gameStarted,
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
  } = useGameState();

  const jump = useCallback(() => {
    if (!gameStarted) {
      startGame();
    }
    if (!isGameOver) {
      setBirdVelocity(JUMP_FORCE);
    }
  }, [gameStarted, isGameOver, startGame, setBirdVelocity]);

  const checkCollision = useCallback((pipe: { x: number; height: number }, birdPos: number) => {
    const birdRight = BIRD_X + BIRD_SIZE;
    const birdLeft = BIRD_X;
    const pipeRight = pipe.x + PIPE_WIDTH;
    const pipeLeft = pipe.x;

    return (
      birdRight > pipeLeft &&
      birdLeft < pipeRight &&
      (birdPos > pipe.height || birdPos + BIRD_SIZE > pipe.height + GAP_SIZE)
    );
  }, []);

  const gameLoop = useCallback(() => {
    if (isGameOver) return;

    setBirdPosition((pos) => pos + birdVelocity);
    setBirdVelocity((vel) => vel + GRAVITY);
    setBirdRotation(birdVelocity * 2);

    setPipes((currentPipes) => {
      let newPipes = currentPipes
        .map((pipe) => ({ ...pipe, x: pipe.x - PIPE_SPEED }))
        .filter((pipe) => pipe.x > -100);

      if (newPipes.length > 0 && newPipes[newPipes.length - 1].x < 800 - PIPE_SPACING) {
        newPipes.push(generatePipe());
      }

      // Check collisions
      newPipes.forEach((pipe) => {
        if (checkCollision(pipe, birdPosition)) {
          setIsGameOver(true);
        }

        // Score increment
        if (!pipe.passed && pipe.x < BIRD_X) {
          pipe.passed = true;
          setScore((s) => {
            const newScore = s + 1;
            setBestScore((best) => Math.max(best, newScore));
            return newScore;
          });
        }
      });

      return newPipes;
    });
  }, [
    isGameOver,
    birdPosition,
    birdVelocity,
    checkCollision,
    setBirdPosition,
    setBirdVelocity,
    setBirdRotation,
    setPipes,
    setScore,
    setBestScore,
    setIsGameOver
  ]);

  useGameLoop(gameLoop, gameStarted && !isGameOver);

  useEffect(() => {
    function handleKeyPress(e: KeyboardEvent) {
      if (e.code === 'Space') {
        jump();
      }
    }

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  return (
    <div 
      className="relative w-full h-screen bg-sky-300 overflow-hidden cursor-pointer"
      onClick={jump}
    >
      <SkyBackground />

      <Bird position={birdPosition} rotation={birdRotation} />
      
      {pipes.map((pipe, index) => (
        <React.Fragment key={index}>
          <Pipe height={pipe.height} position={pipe.x} isTop />
          <Pipe height={500 - pipe.height - GAP_SIZE} position={pipe.x} />
        </React.Fragment>
      ))}

      <div className="absolute bottom-0 w-full h-20 bg-green-800" />

      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <p className="text-4xl font-bold text-white drop-shadow-lg">{score}</p>
      </div>

      {!gameStarted && (
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-2xl font-bold text-white drop-shadow-lg">
            Click or Press Space to Start
          </p>
        </div>
      )}

      {isGameOver && (
        <GameOver
          score={score}
          bestScore={bestScore}
          onRestart={startGame}
        />
      )}
    </div>
  );
}