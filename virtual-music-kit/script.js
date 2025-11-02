const audioContext = new (window.AudioContext || window.webkitAudioContext)();
const sounds = new Map();

const drumKitData = {
  A: { sound: 'kick', name: 'Kick' },
  S: { sound: 'snare', name: 'Snare' },
  D: { sound: 'rimshot', name: 'Rimshot' },
  F: { sound: 'hihat', name: 'Hi-Hat' },
  G: { sound: 'clap', name: 'Clap' },
  H: { sound: 'crash', name: 'Crash' },
  J: { sound: 'ride', name: 'Ride' },
  K: { sound: 'high-tom', name: 'High Tom' },
  L: { sound: 'low-tom', name: 'Low Tom' },
};

async function loadSounds() {
  try {
    for (let key in drumKitData) {
      const soundName = drumKitData[key].sound;
      const soundPath = `assets/sounds/${soundName}.mp3`;

      const response = await fetch(soundPath);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      sounds.set(soundName, audioBuffer);
    }
  } catch (error) {
    console.error('Onload sounds error:', error);
  }
}

function playSound(soundName) {
  if (!sounds.has(soundName)) return;

  const source = audioContext.createBufferSource();
  const gainNode = audioContext.createGain();

  source.buffer = sounds.get(soundName);
  gainNode.gain.value = 1.0;

  source.connect(gainNode);
  gainNode.connect(audioContext.destination);

  source.start();
  return source;
}

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

const keyError = createElement('span', 'key-error', 'text error');
container.append(keyError);

const drumKit = createElement('div', 'drum-kit');
container.append(drumKit);

for (let key in drumKitData) {
  const pad = createElement('div', 'pad');
  const padKey = createElement('div', 'pad-key', `${key}`);
  const padTitle = createElement('h3', 'pad-title', `${drumKitData[key].name}`);
  const padIcon = createElement('div', 'pad-icon');
  pad.dataset.key = key;
  pad.dataset.sound = drumKitData[key].sound;

  drumKit.append(pad);
  pad.append(padKey);
  pad.append(padTitle);
  pad.append(padIcon);
}

let isEdit = false;

drumKit.addEventListener('click', (event) => {
  const pad = event.target.closest('.pad');
  const edit = event.target.closest('.pad-icon');

  if (edit && isEdit) return;

  if (edit) {
    editKey(pad);
  }

  if (!pad || isEdit) return;

  const soundName = pad.dataset.sound;
  playSound(soundName);

  if (pad) {
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 150);
  }
});

document.addEventListener('keydown', (event) => {
  console.log(event.code);
  const key = event.key.toUpperCase();
  if (event.repeat || isEdit) return;

  if (drumKitData[key]) {
    const soundName = drumKitData[key].sound;
    playSound(soundName);

    const pad = document.querySelector(`.pad[data-key="${key}"]`);
    if (pad) {
      pad.classList.add('active');
      setTimeout(() => pad.classList.remove('active'), 150);
    }
  }
});

function editKey(pad) {
  isEdit = true;

  const padKeyElement = pad.querySelector('.pad-key');
  const currentKey = pad.dataset.key;

  const input = createElement('input', 'pad-input');
  input.type = 'text';
  input.value = currentKey;
  input.maxLength = 1;

  padKeyElement.innerText = '';
  padKeyElement.appendChild(input);

  input.focus();
  input.select();

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      const regexLetters = /^[A-Z]$/;
      const newKey = input.value.toUpperCase();

      if (newKey === currentKey) {
        keyError.classList.remove('show');
        finishEditKey(newKey, padKeyElement);
      } else if (!regexLetters.test(newKey)) {
        keyError.innerText = 'You need to use English letters';
        keyError.classList.add('show');
      } else if (newKey !== currentKey && drumKitData[newKey]) {
        keyError.innerText = `The letter ${newKey} is already in use`;
        keyError.classList.add('show');
      } else {
        keyError.classList.remove('show');
        updateKey(pad, newKey, currentKey);
        finishEditKey(newKey, padKeyElement);
      }
    }
  });
}

function finishEditKey(key, element) {
  element.innerHTML = '';
  element.innerText = key;
  isEdit = false;
}

function updateKey(element, key, oldKey) {
  element.dataset.key = key;
  drumKitData[key] = drumKitData[oldKey];
  delete drumKitData[oldKey];
}

await loadSounds();
