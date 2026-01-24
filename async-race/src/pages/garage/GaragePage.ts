import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import Paginate from '../../components/paginate/Paginate';
import Component from '../../core/Component';
import { carStore } from '../../store/CarStore';
import './style.css';

class GaragePage extends Component {
  private readonly form: Form;
  private readonly card: Card;
  private readonly paginate: Paginate;
  private carsCount: string;
  private page: number;

  constructor(id: string) {
    super('main', 'main');
    this.element.setAttribute('id', id);
    this.form = new Form();
    this.card = new Card();
    this.paginate = new Paginate();
    this.carsCount = carStore.getTotalCarsCount();
    this.page = carStore.getCurrentPage();
  }

  render() {
    const formHTML = this.form.render();
    const cardHTML = this.card.render();
    const title = this.createElement('h2', 'garage-title', `Garage (${this.carsCount})`);
    const page = this.createElement('div', 'garage-page', `Page #${this.page}`);

    const paginateHTML = this.paginate.render();

    this.element.append(formHTML, title, page, cardHTML, paginateHTML);
    return this.element;
  }
}

export default GaragePage;
