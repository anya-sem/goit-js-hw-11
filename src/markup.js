import { refs } from "./index.js";

function createMarkup(searchResults) {
    const imgArray = searchResults.map(
        ({
            webformatURL,
            largeImageURL,
            tags,
            likes,
            views,
            comments,
            downloads,
        }) => {
            return `
            <div class="photo-card">
             <a href="${largeImageURL}">
                 <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                       <p class="info-item"><b>Likes ${likes}</b></p>
                       <p class="info-item"><b>Views ${views}</b></p>
                       <p class="info-item"><b>Comments ${comments}</b></p>
                       <p class="info-item"><b>Downloads ${downloads}</b></p>
                    </div>
             </a>
            </div>`;
        }
    ).join('');

    refs.gallery.insertAdjacentHTML('beforeend', imgArray);
};

export { createMarkup }

