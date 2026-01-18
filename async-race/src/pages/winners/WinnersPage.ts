import Component from '../../core/Component';

class WinnersPage extends Component {
  constructor() {
    super('main', 'main');
  }

  render() {
    this.element.textContent = 'Winners Page';

    return this.element;
  }
}

export default WinnersPage;
