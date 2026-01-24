import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import type { Car } from '../../types/type';
import createCarImage from '../../utils/createCarImage';
import createFlagImage from '../../utils/createFlagImage';
import './style.css';

class Card extends Component {
  constructor() {
    super('div', 'card__wrapper');
  }

  private createCard(car: Car) {
    const card = this.createElement('div', 'card');
    const cardHeader = this.createElement('div', 'card-header');
    const cardItem = this.createElement('div', 'card-item');

    const selectCar = this.createElement('button', 'card-btn', 'select');
    const removeCar = this.createElement('button', 'card-btn', 'remove');
    const carName = this.createElement('span', 'card-title', car.name);
    const startButton = this.createElement('button', 'card-start', 'A');
    const stopButton = this.createElement('button', 'card-stop', 'B');
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
