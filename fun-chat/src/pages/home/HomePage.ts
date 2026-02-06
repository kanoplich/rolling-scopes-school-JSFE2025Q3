import Component from '../../core/Component';
import Header from '../../components/header/Header';
import Content from '../../components/content/Content';
import Footer from '../../components/footer/Footer';
import './style.css';

class HomePage extends Component {
  private readonly header: Header;
  private readonly content: Content;
  private readonly footer: Footer;
  constructor() {
    super('div', 'home-container');
    this.header = new Header();
    this.content = new Content();
    this.footer = new Footer();
  }

  render() {
    const headerHTML = this.header.render();
    const contentHTML = this.content.render();
    const footerHTML = this.footer.render();
    this.element.append(headerHTML, contentHTML, footerHTML);

    return this.element;
  }
}

export default HomePage;
