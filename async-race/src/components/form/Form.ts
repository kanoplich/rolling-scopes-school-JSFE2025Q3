import Component from '../../core/Component';
import Button from '../button/Button';
import Input from '../input/Input';
import './style.css';

class Form extends Component {
  constructor() {
    super('form', 'form');
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
    const inputColorHTML = inputColor.render();

    const button = new Button(idButton, textButton);
    const buttonHTML = button.render();

    inputGroup.append(inputTextHTML, inputColorHTML, buttonHTML);

    return inputGroup;
  }

  render() {
    const createGroup = this.createFormGroup('create-text', 'create-color', 'btn-create', 'create');
    const updateGroup = this.createFormGroup('update-text', 'update-color', 'btn-update', 'update');

    const raceButton = new Button('btn-race', 'race');
    const raceButtonHTML = raceButton.render();

    const resetButton = new Button('btn-reset', 'reset');
    const resetButtonHTML = resetButton.render();

    const generateButton = new Button('btn-generate', 'generate cars');
    const generateButtonHTML = generateButton.render();

    const buttonGroup = this.createElement('div', 'form-group');

    buttonGroup.append(raceButtonHTML, resetButtonHTML, generateButtonHTML);
    this.element.append(createGroup, updateGroup, buttonGroup);

    return this.element;
  }
}

export default Form;
