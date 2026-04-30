import Component from '../../core/Component';
import './style.css';

class AboutPage extends Component {
  constructor() {
    super('div', 'about-page');
  }

  render() {
    this.element.innerHTML = '';
    const title = this.createElement('h2', 'about-title', 'FUN Chat');
    const text = this.createElement(
      'div',
      'about-text',
      'What could be better than chatting with your friends using a chat app?'
    );
    const link = this.createElement('a', 'about-link', 'kanoplich');
    link.setAttribute('href', 'https://github.com/kanoplich');
    link.setAttribute('target', 'blank');
    const button = this.createElement('button', 'about-button', 'Go back');
    button.addEventListener('click', (event) => {
      event.preventDefault();
      history.back();
    });

    this.element.append(title, text, link, button);
    return this.element;
  }
}

export default AboutPage;
