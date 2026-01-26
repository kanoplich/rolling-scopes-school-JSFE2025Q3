import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import { winnersStore } from '../../store/WinnersStore';
import createCarImage from '../../utils/createCarImage';
import './style.css';

class Table extends Component {
  private readonly tableHeadItems = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
  private readonly tbody: HTMLElement;
  constructor() {
    super('table', 'winners-table');
    this.tbody = this.createElement('tbody', 'table-body');
  }

  private createTableHeader() {
    const thead = this.createElement('thead', 'table-header');
    const tr = this.createElement('tr', 'table-row');

    for (const name of this.tableHeadItems) {
      const th = this.createElement('th', 'th', `${name}`);
      tr.append(th);
      if (name === 'Wins') {
        th.style.cursor = 'pointer';
        th.dataset.sort = 'ASC';
        this.handleWins(th);
      }
      if (name === 'Best time (seconds)') {
        th.style.cursor = 'pointer';
        th.dataset.sort = 'ASC';
        this.handleTime(th);
      }
    }

    thead.append(tr);

    return thead;
  }

  private handleWins(element: HTMLElement) {
    element.addEventListener('click', async () => {
      const sort = element.dataset.sort === 'ASC' ? 'DESC' : 'ASC';
      element.dataset.sort = sort;
      const page = winnersStore.getCurrentPage();
      await winnersStore.loadWinners(page, 10, 'wins', sort);
    });
  }

  private handleTime(element: HTMLElement) {
    element.addEventListener('click', async () => {
      const sort = element.dataset.sort === 'ASC' ? 'DESC' : 'ASC';
      element.dataset.sort = sort;
      const page = winnersStore.getCurrentPage();
      await winnersStore.loadWinners(page, 10, 'time', sort);
    });
  }

  private async createTableBody(element: HTMLElement) {
    const winners = winnersStore.getWinners();
    const currentPage = winnersStore.getCurrentPage();
    let number = currentPage === 1 ? 1 : currentPage * 10 - 9;

    const elementsArray = [];

    for (const winner of winners) {
      const car = await carStore.getCarFromTotalCountCars(winner.id);
      const tr = this.createElement('tr', 'table-row');
      const position = this.createElement('td', 'td', `${number++}`);
      const auto = this.createElement('td', 'td');
      auto.innerHTML = `${createCarImage(car?.color)}`;
      const name = this.createElement('td', 'td', `${car?.name}`);
      const wins = this.createElement('td', 'td', `${winner.wins}`);
      const time = this.createElement('td', 'td', `${winner.time}`);
      tr.append(position, auto, name, wins, time);
      elementsArray.push(tr);
    }

    element.innerHTML = '';
    element.append(...elementsArray);

    return element;
  }

  mounted() {
    winnersStore.subscribe(() => this.createTableBody(this.tbody));
  }

  render() {
    this.mounted();
    this.element.append(this.createTableHeader(), this.tbody);
    this.createTableBody(this.tbody);
    return this.element;
  }
}

export default Table;
