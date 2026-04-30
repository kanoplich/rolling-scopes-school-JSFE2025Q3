import AppLoader from './appLoader';
import { Callback, NewsData, SourcesData } from '../types/type';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesData>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback as () => void
        );
    }

    public getNews(e: MouseEvent, callback: Callback<NewsData>) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback as () => void
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
