import Component from '../../core/Component';
import { winnersStore } from '../../store/WinnersStore';
import Button from '../button/Button';

class WinnersPaginate extends Component {
  constructor() {
    super('div', 'paginate');
  }

  private renderPaginate() {
    this.element.innerHTML = '';
    const currentPage = winnersStore.getCurrentPage();
    const totalPages = winnersStore.getTotalPages();

    const previous = new Button('prev', 'prev').render() as HTMLButtonElement;
    const next = new Button('next', 'next').render() as HTMLButtonElement;

    previous.disabled = currentPage === 1;
    next.disabled = !(totalPages > 1 && totalPages !== currentPage);

    previous.addEventListener('click', (event) => {
      event.preventDefault();

      winnersStore.loadWinners(currentPage - 1);
      winnersStore.setCurrentPage(currentPage - 1);
    });

    next.addEventListener('click', (event) => {
      event.preventDefault();

      winnersStore.loadWinners(currentPage + 1);
      winnersStore.setCurrentPage(currentPage + 1);
    });

    this.element.append(previous, next);
  }

  mounted() {
    winnersStore.subscribe(() => this.renderPaginate());
  }

  render() {
    this.mounted();
    this.renderPaginate();
    return this.element;
  }
}

export default WinnersPaginate;
