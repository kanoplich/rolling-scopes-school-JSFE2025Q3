import Component from '../../core/Component';

class WinnersPage extends Component {
  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
  }

  render() {
    this.element.textContent = 'Winners Page';

    return this.element;
  }
}

export default WinnersPage;
