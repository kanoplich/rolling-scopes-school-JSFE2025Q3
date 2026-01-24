import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import { animationStart, animationStop, resetAnimation } from '../../utils/animation';
import { generateCarColor, generateCarName } from '../../utils/generateCarData';
import Button from '../button/Button';
import Input from '../input/Input';
import './style.css';

class Form extends Component {
  constructor() {
    super('form', 'form');
    this.element.addEventListener('click', this.handleClick.bind(this));
  }

  private handleClick(event: Event): void {
    const target = event.target as HTMLElement;
    const button = target.closest('button') as HTMLButtonElement;

    if (!button) return;

    event.preventDefault();

    switch (button.id) {
      case 'btn-create': {
        this.handleCreate();
        break;
      }
      case 'btn-update': {
        this.handleUpdate();
        break;
      }
      case 'btn-race': {
        this.handleRace(button);
        break;
      }
      case 'btn-reset': {
        this.handleReset(button);
        break;
      }
      case 'btn-generate': {
        this.handleGenerate(button);
        break;
      }
    }
  }

  private async handleCreate() {
    const nameInput = this.element.querySelector('#create-text') as HTMLInputElement;
    const colorInput = this.element.querySelector('#create-color') as HTMLInputElement;

    const name = nameInput.value;
    const color = colorInput.value;

    if (name && color) {
      await carStore.createCar(name, color);
      await carStore.loadCars();
      nameInput.value = '';
    }
  }

  private async handleUpdate() {
    const nameInput = this.element.querySelector('#update-text') as HTMLInputElement;
    const colorInput = this.element.querySelector('#update-color') as HTMLInputElement;
    const button = this.element.querySelector('#btn-update') as HTMLButtonElement;
    const { car } = carStore.getSelectedCar();

    const name = nameInput.value;
    const color = colorInput.value;

    if (name && color) {
      await carStore.updateCar(car.id, name, color);
      await carStore.loadCars();
      nameInput.value = '';
      carStore.setSelectedCar(car, false);
      nameInput.disabled = true;
      colorInput.disabled = true;
      button.disabled = true;
    }
  }

  private async handleRace(button: HTMLButtonElement) {
    button.disabled = true;
    const cars = carStore.getCars();
    const response = await Promise.all(cars.map((car) => carStore.startEngine(car.id)));
    const resetButton = this.element.querySelector('#btn-reset') as HTMLButtonElement;
    resetButton.disabled = false;

    for (const [index, data] of response.entries()) {
      if (!data) {
        return;
      }
      const id = cars[index].id;
      const time = Math.round(data.distance / data.velocity);
      const carImage = document.querySelector(`.car-img[data-id="${id}"]`) as HTMLElement;

      animationStart(carImage, time);
      carStore.drive(id).then((response) => {
        if (response.status !== 200) {
          animationStop(carImage);
        }
      });
    }
  }

  private async handleReset(button: HTMLButtonElement) {
    const cars = carStore.getCars();

    for (const car of cars) {
      const carImage = document.querySelector(`.car-img[data-id="${car.id}"]`) as HTMLElement;
      carStore.stopEngine(car.id).then(() => {
        resetAnimation(carImage);
      });
    }

    button.disabled = true;
    const raceButton = this.element.querySelector('#btn-race') as HTMLButtonElement;
    raceButton.disabled = false;
  }

  private async handleGenerate(button: HTMLButtonElement) {
    button.disabled = true;
    const carsData = [];

    for (let index = 1; index <= 100; index += 1) {
      const name = generateCarName();
      const color = generateCarColor();

      carsData.push(carStore.createCar(name, color));
    }

    await Promise.all(carsData);
    await carStore.loadCars();

    button.disabled = false;
  }

  private createFormGroup(
    idInputText: string,
    idInputColor: string,
    idButton: string,
    textButton: string
  ): HTMLElement {
    const inputGroup = this.createElement('div', 'form-group');

    const inputText = new Input('text', idInputText);
    const inputTextHTML = inputText.render() as HTMLInputElement;
    if (idInputText === 'update-text') {
      inputTextHTML.disabled = true;
    }

    const inputColor = new Input('color', idInputColor);
    inputColor.setAttribute('value', '#bfbfbf');
    const inputColorHTML = inputColor.render() as HTMLInputElement;
    if (idInputColor === 'update-color') {
      inputColorHTML.disabled = true;
    }

    const button = new Button(idButton, textButton);
    const buttonHTML = button.render() as HTMLButtonElement;
    if (idButton === 'btn-update') {
      buttonHTML.disabled = true;
    }

    inputGroup.append(inputTextHTML, inputColorHTML, buttonHTML);

    return inputGroup;
  }

  render() {
    const createGroup = this.createFormGroup('create-text', 'create-color', 'btn-create', 'create');
    const updateGroup = this.createFormGroup('update-text', 'update-color', 'btn-update', 'update');
    const buttonGroup = this.createElement('div', 'form-group');

    const raceButton = new Button('btn-race', 'race');
    const raceButtonHTML = raceButton.render();

    const resetButton = new Button('btn-reset', 'reset');
    const resetButtonHTML = resetButton.render() as HTMLButtonElement;
    resetButtonHTML.disabled = true;

    const generateButton = new Button('btn-generate', 'generate cars');
    const generateButtonHTML = generateButton.render();

    buttonGroup.append(raceButtonHTML, resetButtonHTML, generateButtonHTML);
    this.element.append(createGroup, updateGroup, buttonGroup);

    return this.element;
  }
}

export default Form;
