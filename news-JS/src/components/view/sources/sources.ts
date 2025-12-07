import { Source } from '../../types/type';
import './sources.css';

class Sources {
    draw(data: Source[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            const sourceItem = sourceClone.querySelector('.source__item') as HTMLDivElement;

            sourceItemName.textContent = item.name;
            sourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);
    }
}

export default Sources;
