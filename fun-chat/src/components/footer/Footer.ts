import Component from '../../core/Component';
import './style.css';

class Footer extends Component {
  constructor() {
    super('section', 'footer');
  }

  render() {
    this.element.innerHTML = '';

    const github = this.createElement('a', 'footer-link', 'kanoplich');
    github.setAttribute('href', 'https://github.com/kanoplich');
    github.setAttribute('target', 'blank');

    const rsSchool = this.createElement('a', 'footer-link', 'RSSchool');
    rsSchool.setAttribute('href', 'https://rs.school/');
    rsSchool.setAttribute('target', 'blank');

    const year = this.createElement('span', 'footer-year', '2026');

    this.element.append(rsSchool, github, year);
    return this.element;
  }
}

export default Footer;
