import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { NewsData, SourcesData } from '../types/type';

class App {
    private readonly controller: AppController;
    private readonly view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const element = document.querySelector('.sources') as HTMLElement;

        element.addEventListener('click', (e: MouseEvent) =>
            this.controller.getNews(e, (data: NewsData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourcesData) => this.view.drawSources(data));
    }
}

export default App;
