export function generatePipe() {
  const minHeight = 50;
  const maxHeight = 300;
  const height = Math.random() * (maxHeight - minHeight) + minHeight;
  return { x: 800, height };
}