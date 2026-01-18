import Component from '../../core/Component';
import Button from '../button/Button';
import './style.css';

class Paginate extends Component {
  constructor() {
    super('div', 'paginate');
  }

  render() {
    const previous = new Button('btn', 'prev');
    const next = new Button('btn', 'next');

    const previousHTML = previous.render();
    const nextHTML = next.render();

    this.element.append(previousHTML, nextHTML);
    return this.element;
  }
}

export default Paginate;
