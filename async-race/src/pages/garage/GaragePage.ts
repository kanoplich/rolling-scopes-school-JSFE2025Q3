import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import GarageHeader from '../../components/garageHeader/GarageHeader';
import Paginate from '../../components/paginate/Paginate';
import Component from '../../core/Component';
import './style.css';

class GaragePage extends Component {
  private readonly form: Form;
  private readonly card: Card;
  private readonly paginate: Paginate;
  private readonly garageHeader: GarageHeader;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.form = new Form();
    this.card = new Card();
    this.paginate = new Paginate();
    this.garageHeader = new GarageHeader();
  }

  render() {
    const formHTML = this.form.render();
    const cardHTML = this.card.render();
    const garageHeaderHTML = this.garageHeader.render();
    const paginateHTML = this.paginate.render();

    this.element.append(formHTML, garageHeaderHTML, cardHTML, paginateHTML);
    return this.element;
  }
}

export default GaragePage;
