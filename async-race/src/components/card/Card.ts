import Component from '../../core/Component';
import createCarImage from '../../utils/createCarImage';
import createFlagImage from '../../utils/createFlagImage';
import './style.css';

class Card extends Component {
  constructor() {
    super('div', 'card__wrapper');
  }

  private createCard(title: string) {
    const card = this.createElement('div', 'card');
    const cardHeader = this.createElement('div', 'card-header');
    const cardItem = this.createElement('div', 'card-item');

    const selectCar = this.createElement('button', 'card-btn', 'select');
    const removeCar = this.createElement('button', 'card-btn', 'remove');
    const carName = this.createElement('span', 'card-title', title);
    const startButton = this.createElement('button', 'card-start', 'A');
    const stopButton = this.createElement('button', 'card-stop', 'B');
    const carImage = this.createElement('div', 'car-img');
    const flagImage = this.createElement('div', 'flag-img');
    const line = this.createElement('div', 'card-line');
    carImage.innerHTML = `${createCarImage()}`;
    flagImage.innerHTML = `${createFlagImage()}`;

    cardHeader.append(selectCar, removeCar, carName);
    cardItem.append(startButton, stopButton, carImage, flagImage);

    card.append(cardHeader, cardItem, line);

    return card;
  }

  render() {
    const card = this.createCard('Tesla');

    this.element.append(card);
    return this.element;
  }
}

export default Card;
