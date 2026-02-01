import Component from '../core/Component';
import type { Routes } from '../types/type';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';
import LoginPage from '../pages/login/LoginPage';
import NotFoundPage from '../pages/notFound/NotFoundPage';

class Router extends Component {
  private readonly routes: Routes[];
  private readonly homePage: HomePage;
  private readonly aboutPage: AboutPage;
  private readonly loginPage: LoginPage;
  private readonly notFoundPage: NotFoundPage;

  constructor() {
    super('main', 'main');

    this.homePage = new HomePage();
    this.aboutPage = new AboutPage();
    this.loginPage = new LoginPage();
    this.notFoundPage = new NotFoundPage();

    this.routes = [
      {
        path: '/',
        element: this.homePage,
      },
      {
        path: '/about',
        element: this.aboutPage,
      },
      {
        path: '/login',
        element: this.loginPage,
      },
    ];

    globalThis.addEventListener('popstate', () => {
      this.resolveRoute();
    });

    this.resolveRoute();
  }

  navigate(path: string): void {
    history.pushState(undefined, '', path);
    this.resolveRoute();
  }

  private resolveRoute() {
    const currentPath = globalThis.location.pathname;
    const route = this.routes.find((route) => route.path === currentPath);

    if (route) {
      this.element.innerHTML = '';
      this.element.append(route.element.render());
    } else {
      this.element.innerHTML = '';
      this.element.append(this.notFoundPage.render());
    }
  }

  render() {
    return this.element;
  }
}

export default Router;
