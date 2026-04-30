import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import Button from '../button/Button';

class GaragePaginate extends Component {
  constructor() {
    super('div', 'paginate');
  }

  private renderPaginate() {
    this.element.innerHTML = '';
    const currentPage = carStore.getCurrentPage();
    const totalPages = carStore.getTotalPages();

    const previous = new Button('prev', 'prev').render() as HTMLButtonElement;
    const next = new Button('next', 'next').render() as HTMLButtonElement;

    previous.disabled = currentPage === 1;
    next.disabled = !(totalPages > 1 && totalPages !== currentPage);

    previous.addEventListener('click', (event) => {
      event.preventDefault();

      carStore.loadCars(currentPage - 1);
      carStore.setCurrentPage(currentPage - 1);
    });

    next.addEventListener('click', (event) => {
      event.preventDefault();

      carStore.loadCars(currentPage + 1);
      carStore.setCurrentPage(currentPage + 1);
    });

    this.element.append(previous, next);
  }

  mounted() {
    carStore.subscribe(() => this.renderPaginate());
  }

  render() {
    this.mounted();
    this.renderPaginate();
    return this.element;
  }
}

export default GaragePaginate;
