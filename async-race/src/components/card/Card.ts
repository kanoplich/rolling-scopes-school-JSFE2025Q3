import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import type { Car } from '../../types/type';
import createCarImage from '../../utils/createCarImage';
import createFlagImage from '../../utils/createFlagImage';
import './style.css';

class Card extends Component {
  constructor() {
    super('div', 'card__wrapper');
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('button') as HTMLButtonElement;

    if (!button) return;

    event.preventDefault();

    switch (button.className) {
      case 'card-remove': {
        this.handleRemove(button);
        break;
      }
      case 'card-select': {
        this.handleSelect(button);
        break;
      }
      case 'card-start': {
        this.handleStart();
        break;
      }
      case 'card-stop': {
        this.handleStop();
        break;
      }
    }
  }

  private async handleRemove(button: HTMLButtonElement) {
    const id = button.dataset.id;
    if (id) {
      await carStore.deleteCar(+id);
      await carStore.loadCars();
    }
  }

  private async handleSelect(button: HTMLButtonElement) {
    const id = button.dataset.id;

    if (!id) {
      return;
    }
    const car = carStore.getCar(+id);

    const nameInput = document.querySelector('#update-text') as HTMLInputElement;
    const colorInput = document.querySelector('#update-color') as HTMLInputElement;

    nameInput.disabled = false;
    colorInput.disabled = false;

    if (car) {
      nameInput.value = car.name;
      colorInput.value = car.color;
      carStore.setSelectedCar(car, true);
    }
    const buttonUpdate = document.querySelector('#btn-update') as HTMLButtonElement;
    buttonUpdate.disabled = false;
  }

  private async handleStart() {}

  private async handleStop() {}

  private createCard(car: Car) {
    const card = this.createElement('div', 'card');
    const cardHeader = this.createElement('div', 'card-header');
    const cardItem = this.createElement('div', 'card-item');

    const selectCar = this.createElement('button', 'card-select', 'select');
    selectCar.dataset.id = `${car.id}`;
    const removeCar = this.createElement('button', 'card-remove', 'remove');
    removeCar.dataset.id = `${car.id}`;
    const carName = this.createElement('span', 'card-title', car.name);
    const startButton = this.createElement('button', 'card-start', 'A');
    const stopButton = this.createElement('button', 'card-stop', 'B') as HTMLButtonElement;
    stopButton.disabled = true;
    const carImage = this.createElement('div', 'car-img');
    const flagImage = this.createElement('div', 'flag-img');
    const line = this.createElement('div', 'card-line');
    carImage.innerHTML = `${createCarImage(car.color)}`;
    flagImage.innerHTML = `${createFlagImage()}`;

    cardHeader.append(selectCar, removeCar, carName);
    cardItem.append(startButton, stopButton, carImage, flagImage);

    card.append(cardHeader, cardItem, line);

    return card;
  }

  private renderCards() {
    this.element.innerHTML = '';
    const cars = carStore.getCars();

    for (const car of cars) {
      this.element.append(this.createCard(car));
    }
  }

  mounted() {
    carStore.subscribe(() => this.renderCards());
  }

  render() {
    this.mounted();
    this.renderCards();
    return this.element;
  }
}

export default Card;
