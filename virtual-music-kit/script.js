function createElement(type, style, text = '') {
  const element = document.createElement(type);
  element.classList.add(style);
  element.innerText = text;
  return element;
}

const body = document.body;
const container = createElement('div', 'container');

body.append(container);

const titleWrapper = createElement('div', 'title-wrapper');
container.append(titleWrapper);

const title = createElement('h1', 'title', 'Virtual Drum Kit');
const titleIcon = createElement('div', 'title-icon');
titleWrapper.append(titleIcon);
titleWrapper.append(title);

const drumKit = createElement('div', 'drum-kit');
container.append(drumKit);

for (let i = 0; i < 9; i++) {
  const pad = createElement('div', 'pad');
  drumKit.append(pad);
}
