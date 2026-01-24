const carName = [
  'BMW',
  'AUDI',
  'TESLA',
  'OPEL',
  'FORD',
  'JAGUAR',
  'MAZDA',
  'SKODA',
  'VOLKSWAGEN',
  'VOLVO',
];
const carModel = [
  'M5',
  'S7',
  'Model S',
  'Insignia',
  'Mustang',
  'S-Type',
  'RX-7',
  'Superb',
  'Golf GTI',
  'XC90',
];

function getRandomItem() {
  return Math.floor(Math.random() * 10);
}

export const generateCarName = () => {
  const name: string = `${carName[getRandomItem()]} ${carModel[getRandomItem()]}`;
  return name;
};

export const generateCarColor = () => {
  const color: string = `#${getRandomItem()}${getRandomItem()}${getRandomItem()}${getRandomItem()}${getRandomItem()}${getRandomItem()}`;
  return color;
};
