import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
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
        this.handleRace();
        break;
      }
      case 'btn-reset': {
        this.handleReset();
        break;
      }
      case 'btn-generate': {
        this.handleGenerate();
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
      nameInput.value = '';
    }
  }

  private createFormGroup(
    idInputText: string,
    idInputColor: string,
    idButton: string,
    textButton: string
  ): HTMLElement {
    const inputGroup = this.createElement('div', 'form-group');

    const inputText = new Input('text', idInputText);
    const inputTextHTML = inputText.render();

    const inputColor = new Input('color', idInputColor);
    inputColor.setValue('#bfbfbf');
    const inputColorHTML = inputColor.render();

    const button = new Button(idButton, textButton);
    const buttonHTML = button.render();

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
    const resetButtonHTML = resetButton.render();

    const generateButton = new Button('btn-generate', 'generate cars');
    const generateButtonHTML = generateButton.render();

    buttonGroup.append(raceButtonHTML, resetButtonHTML, generateButtonHTML);
    this.element.append(createGroup, updateGroup, buttonGroup);

    return this.element;
  }
}

export default Form;
