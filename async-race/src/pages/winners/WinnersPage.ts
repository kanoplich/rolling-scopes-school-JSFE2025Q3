import Paginate from '../../components/paginate/Paginate';
import Table from '../../components/table/Table';
import Component from '../../core/Component';
import './style.css';

class WinnersPage extends Component {
  private readonly paginate: Paginate;
  private readonly table: Table;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.paginate = new Paginate();
    this.table = new Table();
  }

  render() {
    const title = this.createElement('h2', 'winners-title', `Winners ()`);
    const page = this.createElement('div', 'winners-page', 'Page #');

    const tableHTML = this.table.render();
    const paginateHTML = this.paginate.render();

    this.element.append(title, page, tableHTML, paginateHTML);
    return this.element;
  }
}

export default WinnersPage;
