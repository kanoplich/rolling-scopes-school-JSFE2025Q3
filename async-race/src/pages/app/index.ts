import Header from '../../components/header/Header';
import GaragePage from '../garage/GaragePage';
import WinnersPage from '../winners/WinnersPage';

class App {
  private static readonly element: HTMLElement = document.body;
  private readonly header: Header;
  private readonly garagePage: GaragePage;

  constructor() {
    this.header = new Header();
    this.garagePage = new GaragePage('garage');
  }

  static renderPage(id: string) {
    let page: GaragePage | WinnersPage;
    const currentPage = document.querySelector('.main');
    if (currentPage) {
      currentPage.remove();
    }

    switch (id) {
      case 'garage': {
        page = new GaragePage('garage');
        break;
      }
      case 'winners': {
        page = new WinnersPage('winners');
        break;
      }
      default: {
        page = new GaragePage('garage');
      }
    }

    const pageHTML = page.render();
    App.element.append(pageHTML);
  }

  private enableChangeRoute() {
    globalThis.addEventListener('hashchange', () => {
      const hash = globalThis.location.hash.slice(1);
      App.renderPage(hash);
    });
  }

  private initialPage() {
    const initialHash = globalThis.location.hash.slice(1);

    if (initialHash) {
      App.renderPage(initialHash);
    } else {
      App.element.append(this.garagePage.render());
    }
  }

  run() {
    App.element.append(this.header.render());
    this.initialPage();
    this.enableChangeRoute();
  }
}

export default App;
