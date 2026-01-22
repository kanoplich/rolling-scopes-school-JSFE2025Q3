import Component from '../../core/Component';
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

  private createTableBody() {
    const tbody = this.createElement('tbody', 'table-body');
    const tr = this.createElement('tr', 'table-row');

    tbody.append(tr);

    return tbody;
  }

  render() {
    const tableHeader = this.createTableHeader();
    const tableBody = this.createTableBody();

    this.element.append(tableHeader, tableBody);
    return this.element;
  }
}

export default Table;
