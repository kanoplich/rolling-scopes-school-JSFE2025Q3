import Table from '../../components/table/Table';
import WinnersHeader from '../../components/winnersHeader/WinnersHeader';
import WinnersPaginate from '../../components/winnersPaginate/WinnersPaginate';
import Component from '../../core/Component';
import './style.css';

class WinnersPage extends Component {
  private readonly table: Table;
  private readonly winnersHeader: WinnersHeader;
  private readonly paginate: WinnersPaginate;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.table = new Table();
    this.winnersHeader = new WinnersHeader();
    this.paginate = new WinnersPaginate();
  }

  render() {
    const tableHTML = this.table.render();
    const winnersHeaderHTML = this.winnersHeader.render();
    const paginateHTML = this.paginate.render();
    this.element.append(winnersHeaderHTML, tableHTML, paginateHTML);
    return this.element;
  }
}

export default WinnersPage;
