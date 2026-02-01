import Router from '../../router/Router';

class App {
  private static readonly element: HTMLElement = document.body;
  private readonly page: Router;

  constructor() {
    this.page = new Router();
  }

  run() {
    const pageHTML = this.page.render();
    App.element.append(pageHTML);
  }
}

export default App;
