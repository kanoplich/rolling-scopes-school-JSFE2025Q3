import Card from '../../components/card/Card';
import Form from '../../components/form/Form';
import Paginate from '../../components/paginate/Paginate';
import Component from '../../core/Component';
import './style.css';

class GaragePage extends Component {
  private readonly form: Form;
  private readonly card: Card;
  private readonly paginate: Paginate;

  constructor() {
    super('main', 'main');
    this.form = new Form();
    this.card = new Card();
    this.paginate = new Paginate();
  }

  render() {
    const formHTML = this.form.render();
    const cardHTML = this.card.render();
    const title = this.createElement('h2', 'garage-title', `Garage ()`);
    const page = this.createElement('div', 'garage-page', 'Page #');

    const paginateHTML = this.paginate.render();

    this.element.append(formHTML, title, page, cardHTML, paginateHTML);
    return this.element;
  }
}

export default GaragePage;
