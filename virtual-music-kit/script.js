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

const drumKit = createElement('div', 'drum-kit');
container.append(drumKit);

for (let key in drumKitData) {
  const pad = createElement('div', 'pad');
  const padKey = createElement('div', 'pad-key', `${key}`);
  const padTitle = createElement('h3', 'pad-title', `${drumKitData[key].name}`);
  pad.dataset.key = key;
  pad.dataset.sound = drumKitData[key].sound;

  drumKit.append(pad);
  pad.append(padKey);
  pad.append(padTitle);
}

drumKit.addEventListener('click', (event) => {
  const pad = event.target.closest('.pad');

  if (!pad) return;

  const soundName = pad.dataset.sound;
  playSound(soundName);
});

document.addEventListener('keydown', (event) => {
  const key = event.key.toUpperCase();
  if (event.repeat) return;

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

await loadSounds();
