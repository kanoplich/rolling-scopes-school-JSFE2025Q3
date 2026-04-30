import Component from '../../core/Component';
import DialogField from '../dialogField/DialogField';
import DialogForm from '../dialogForm/DialogForm';
import DialogHeader from '../dialogHeader/DialogHeader';
import './style.css';

class Dialog extends Component {
  private readonly header: DialogHeader;
  private readonly field: DialogField;
  private readonly form: DialogForm;
  constructor() {
    super('article', 'content-dialog');
    this.header = new DialogHeader();
    this.field = new DialogField();
    this.form = new DialogForm();
  }

  render() {
    const headerElement = this.header.render();
    const fieldElement = this.field.render();
    const formElement = this.form.render();
    this.element.append(headerElement, fieldElement, formElement);
    return this.element;
  }
}

export default Dialog;
