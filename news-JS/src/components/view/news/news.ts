import { Article } from '../../types/type';
import './news.css';

class News {
    draw(data: Article[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) {
                const newsItem = newsClone.querySelector('.news__item') as HTMLDivElement;
                newsItem.classList.add('alt');
            }

            const newsPhoto = newsClone.querySelector('.news__meta-photo') as HTMLDivElement;
            const newsAuthor = newsClone.querySelector('.news__meta-author') as HTMLLIElement;
            const newsData = newsClone.querySelector('.news__meta-date') as HTMLLIElement;

            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsAuthor.textContent = item.author || item.source.name;
            newsData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsTitle = newsClone.querySelector('.news__description-title') as HTMLHeadingElement;
            const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLHeadingElement;
            const newsDescriptionContent = newsClone.querySelector(
                '.news__description-content'
            ) as HTMLParagraphElement;
            const newsLink = newsClone.querySelector('.news__read-more a') as HTMLParagraphElement;

            newsTitle.textContent = item.title;
            newsDescriptionSource.textContent = item.source.name;
            newsDescriptionContent.textContent = item.description;
            newsLink.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
