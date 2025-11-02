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

const keyCodeData = {
  KeyA: 'A',
  KeyB: 'B',
  KeyC: 'C',
  KeyD: 'D',
  KeyE: 'E',
  KeyF: 'F',
  KeyG: 'G',
  KeyH: 'H',
  KeyI: 'I',
  KeyJ: 'J',
  KeyK: 'K',
  KeyL: 'L',
  KeyM: 'M',
  KeyN: 'N',
  KeyO: 'O',
  KeyP: 'P',
  KeyQ: 'Q',
  KeyR: 'R',
  KeyS: 'S',
  KeyT: 'T',
  KeyU: 'U',
  KeyV: 'V',
  KeyW: 'W',
  KeyX: 'X',
  KeyY: 'Y',
  KeyZ: 'Z',
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

const playWrapper = createElement('div', 'play-wrapper', '');
const btnPlay = createElement('button', 'play-btn', '');
btnPlay.disabled = true;
const inputPlay = createElement('input', 'play-input');
inputPlay.type = 'text';
inputPlay.maxLength = Object.entries(drumKitData).length * 2;
container.append(playWrapper);
playWrapper.append(btnPlay);
playWrapper.append(inputPlay);

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
let isInput = false;
let isPlaySong = false;
let isKeyActive = false;
let keyCodeActive = '';

drumKit.addEventListener('click', (event) => {
  const pad = event.target.closest('.pad');
  const edit = event.target.closest('.pad-icon');

  if (edit && isEdit) return;

  if (edit && !isPlaySong) {
    editKey(pad);
  }

  if (!pad || isEdit || isInput || isPlaySong) return;

  const soundName = pad.dataset.sound;
  playSound(soundName);

  if (pad) {
    pad.classList.add('active');
    setTimeout(() => pad.classList.remove('active'), 150);
  }
});

document.addEventListener('keydown', (event) => {
  const key = keyCodeData[event.code];
  if (event.repeat || isEdit || isInput || isPlaySong || isKeyActive) return;

  if (drumKitData[key]) {
    isKeyActive = true;
    keyCodeActive = event.code;
    const soundName = drumKitData[key].sound;
    playSound(soundName);

    const pad = document.querySelector(`.pad[data-key="${key}"]`);
    if (pad) {
      pad.classList.add('active');
      setTimeout(() => pad.classList.remove('active'), 150);
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.code === keyCodeActive) {
    isKeyActive = false;
    keyCodeActive = '';
  }
});

inputPlay.addEventListener('focus', () => {
  isInput = true;
});

inputPlay.addEventListener('blur', () => {
  isInput = false;
});

inputPlay.addEventListener('input', () => {
  if (inputPlay.value.length > 0) {
    btnPlay.disabled = false;
  } else {
    btnPlay.disabled = true;
  }
});

inputPlay.addEventListener('keydown', (event) => {
  const inputKey = event.key.toUpperCase();

  if (
    event.key === 'Backspace' ||
    event.key === 'Delete' ||
    event.key === 'ArrowLeft' ||
    event.key === 'ArrowRight'
  ) {
    return;
  }

  if (!drumKitData[inputKey] || isEdit) {
    event.preventDefault();
  }
});

btnPlay.addEventListener('click', () => {
  const songArr = inputPlay.value.toUpperCase().split('');

  if (songArr.length === 0) {
    isPlaySong = false;
    return;
  }

  if (!isPlaySong && !isEdit) {
    isPlaySong = true;
    btnPlay.disabled = true;
    inputPlay.disabled = true;

    songArr.forEach((key, index) => {
      setTimeout(() => {
        let soundName = drumKitData[key].sound;

        playSound(soundName);

        const pad = document.querySelector(`.pad[data-key="${key}"]`);
        if (pad) {
          pad.classList.add('active');
          setTimeout(() => pad.classList.remove('active'), 150);
        }

        if (index === songArr.length - 1) {
          isPlaySong = false;
          btnPlay.disabled = false;
          inputPlay.disabled = false;
        }
      }, index * 300);
    });
  }
});

function editKey(pad) {
  isEdit = true;

  inputPlay.value = '';
  btnPlay.disabled = true;
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
