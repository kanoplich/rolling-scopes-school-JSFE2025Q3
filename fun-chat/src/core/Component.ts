abstract class Component {
  protected element: HTMLElement;

  constructor(tagName = 'div', className = '') {
    this.element = document.createElement(tagName);

    if (className) {
      this.element.className = className;
    }
  }

  abstract render(): HTMLElement;

  protected createElement(tagName: string, className: string, text = '') {
    const element = document.createElement(tagName);
    element.classList.add(className);
    element.textContent = text;

    return element;
  }

  protected setContent(html: string): void {
    this.element.innerHTML = html;
  }

  protected addClass(className: string): void {
    this.element.classList.add(className);
  }

  protected removeClass(className: string): void {
    this.element.classList.remove(className);
  }
}

export default Component;
