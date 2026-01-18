import Form from '../../components/form/Form';
import Component from '../../core/Component';

class GaragePage extends Component {
  private readonly form: Form;

  constructor() {
    super('main', 'main');
    this.form = new Form();
  }

  render() {
    const formHTML = this.form.render();
    this.element.append(formHTML);
    return this.element;
  }
}

export default GaragePage;
