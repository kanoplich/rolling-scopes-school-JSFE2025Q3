import Table from '../../components/table/Table';
import Component from '../../core/Component';
import './style.css';

class WinnersPage extends Component {
  private readonly table: Table;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.table = new Table();
  }

  render() {
    const title = this.createElement('h2', 'winners-title', `Winners ()`);
    const page = this.createElement('div', 'winners-page', 'Page #');

    const tableHTML = this.table.render();

    this.element.append(title, page, tableHTML);
    return this.element;
  }
}

export default WinnersPage;
