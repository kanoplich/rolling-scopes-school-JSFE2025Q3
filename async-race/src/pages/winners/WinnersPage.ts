import Table from '../../components/table/Table';
import WinnersHeader from '../../components/winnersHeader/WinnersHeader';
import Component from '../../core/Component';
import './style.css';

class WinnersPage extends Component {
  private readonly table: Table;
  private readonly winnersHeader: WinnersHeader;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.table = new Table();
    this.winnersHeader = new WinnersHeader();
  }

  render() {
    const tableHTML = this.table.render();
    const winnersHeaderHTML = this.winnersHeader.render();
    this.element.append(winnersHeaderHTML, tableHTML);
    return this.element;
  }
}

export default WinnersPage;
