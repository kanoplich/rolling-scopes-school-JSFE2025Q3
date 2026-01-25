import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';

class GarageHeader extends Component {
  constructor() {
    super('div', 'garage-header');
  }

  private renderHeaders() {
    this.element.innerHTML = '';

    const carsCount = carStore.getTotalCarsCount();
    const currentPage = carStore.getCurrentPage();
    const title = this.createElement('h2', 'garage-title', `Garage (${carsCount})`);
    const page = this.createElement('div', 'garage-page', `Page #${currentPage}`);

    this.element.append(title, page);
  }

  mounted() {
    carStore.subscribe(() => this.renderHeaders());
  }

  render() {
    this.mounted();
    this.renderHeaders();

    return this.element;
  }
}

export default GarageHeader;
