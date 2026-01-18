import Header from '../../components/header/Header';
import GaragePage from '../garage/GaragePage';

class App {
  private readonly element: HTMLElement;
  private readonly header: Header;
  private readonly garagePage: GaragePage;

  constructor() {
    this.element = document.body;
    this.header = new Header();
    this.garagePage = new GaragePage();
  }

  run() {
    const headerHTML = this.header.render();
    this.element.append(headerHTML);

    const garagePageHTML = this.garagePage.render();
    this.element.append(garagePageHTML);
  }
}

export default App;
