import Component from '../../core/Component';
import { store } from '../../store/Store';
import './style.css';

class Search extends Component {
  constructor() {
    super('input', 'search');
    this.element.setAttribute('type', 'search');
    this.element.setAttribute('id', 'search');
    this.element.setAttribute('placeholder', 'Search');
    this.element.addEventListener('input', this.handleInput.bind(this));
  }

  private handleInput(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    event.preventDefault();

    const target = event.target;
    store.setSearchValue(target.value);
  }

  render() {
    return this.element;
  }
}

export default Search;
