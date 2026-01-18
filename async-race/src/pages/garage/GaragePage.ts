import Component from '../../core/Component';

class GaragePage extends Component {
  constructor() {
    super('main', 'main');
  }

  render() {
    this.element.textContent = 'Garage Page';
    return this.element;
  }
}

export default GaragePage;
