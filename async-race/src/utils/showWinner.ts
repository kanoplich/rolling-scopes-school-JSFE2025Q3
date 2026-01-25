export const showWinner = (name: string, time: number) => {
  const winner = document.querySelector('.winner') as HTMLElement;
  winner.textContent = `${name} first ${(time / 1000).toFixed(2)}s!`;
  winner.style.display = 'block';
  globalThis.addEventListener('click', () => {
    winner.style.display = 'none';
  });
};
