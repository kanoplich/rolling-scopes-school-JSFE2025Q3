import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import { winnersStore } from '../../store/WinnersStore';
import type { Winners } from '../../types/type';
import createCarImage from '../../utils/createCarImage';
import './style.css';

class Table extends Component {
  private readonly tableHeadItems = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)'];
  constructor() {
    super('table', 'winners-table');
  }

  private createTableHeader() {
    const thead = this.createElement('thead', 'table-header');
    const tr = this.createElement('tr', 'table-row');

    for (const name of this.tableHeadItems) {
      const th = this.createElement('th', 'th', `${name}`);
      tr.append(th);
    }

    thead.append(tr);

    return thead;
  }

  private async createTableBody(winners: Winners) {
    const tbody = this.createElement('tbody', 'table-body');
    const currentPage = winnersStore.getCurrentPage();
    let number = currentPage === 1 ? 1 : currentPage * 10 - 10;

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
      tbody.append(tr);
    }

    return tbody;
  }

  private async renderWinners() {
    this.element.innerHTML = '';
    const winners = winnersStore.getWinners();
    this.element.append(this.createTableHeader(), await this.createTableBody(winners));
  }

  mounted() {
    winnersStore.subscribe(() => this.renderWinners());
  }

  render() {
    this.mounted();
    this.renderWinners();
    return this.element;
  }
}

export default Table;
