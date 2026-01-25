import Component from '../../core/Component';
import { winnersStore } from '../../store/WinnersStore';

class WinnersHeader extends Component {
  constructor() {
    super('div', 'winners-header');
  }

  private renderHeaders() {
    this.element.innerHTML = '';

    const winnersCount = winnersStore.getTotalWinnersCount();
    const currentPage = winnersStore.getCurrentPage();
    const title = this.createElement('h2', 'winners-title', `Winners (${winnersCount})`);
    const page = this.createElement('div', 'winners-page', `Page #${currentPage}`);

    this.element.append(title, page);
  }

  mounted() {
    winnersStore.subscribe(() => this.renderHeaders());
  }

  render() {
    this.mounted();
    this.renderHeaders();

    return this.element;
  }
}

export default WinnersHeader;
