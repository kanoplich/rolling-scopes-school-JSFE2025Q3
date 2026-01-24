export const animationStart = (HTMLElement: HTMLElement, time: number) => {
  const element = HTMLElement;
  const carFlag = document.querySelector('.flag-img') as HTMLElement;
  const distance = carFlag.offsetLeft - 55;
  element.style.transition = `transform ${time}ms linear`;
  element.style.transform = `translateX(${distance}px)`;
};

export const animationStop = (HTMLElement: HTMLElement) => {
  const element = HTMLElement;
  const number = globalThis.getComputedStyle(element);
  element.style.transition = 'transform 0ms linear';
  element.style.transform = `${number.transform}`;
};

export const resetAnimation = (HTMLElement: HTMLElement) => {
  const element = HTMLElement;
  element.style.transform = 'translateX(0px)';
  element.style.transition = 'transform 0ms linear';
};
