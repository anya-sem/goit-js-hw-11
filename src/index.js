import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from './markup.js';
import { NewsApiServer } from './img-api.js';

const search = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadBtn = document.querySelector('.load-more');


search.addEventListener('submit', onSubmit);
loadBtn.addEventListener('click', onLoad);


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  captionPosition: 'bottom',
});


const newsApiServer = new NewsApiServer();
loadBtn.style.display = 'none';


function onSubmit(evt) {
  evt.preventDefault();
  window.scrollTo(0, 0);
  clearPage();

  loadBtn.style.display = 'none';

  newsApiServer.searchQuery = evt.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase()
    .split(' ')
    .join('+');
  // console.log(newsApiServer.searchQuery);

  if (newsApiServer.searchQuery === '') {
    return Notiflix.Notify.info("Please fill in the search field.");
  }

  fetchPhoto();
}


function fetchPhoto() {
  clearPage();

  newsApiServer
    .fetchImages()
    .then(data => {
      if (data.totalHits === 0) {
        clearPage();
        return Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
      } else {
        Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
        
        newsApiServer.totalImages += data.hits.length;
        appendPhotoMarkup(data);
        lightbox.refresh();

        if (data.totalHits <= newsApiServer.totalImages) {
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
          newsApiServer.totalImages = 0;
          return;
        }

        loadBtn.style.display = 'block';
      }
    })
    .catch(error => console.log(error.message));
    loadBtn.addEventListener("click", onLoadClick)
}

function onLoad() {
  newsApiServer
    .fetchImages()
    .then(data => {
      appendPhotoMarkup(data);
      lightbox.refresh();

      newsApiServer.totalImages += data.hits.length;
      const numberOfLastPage = Math.ceil(data.totalHits / newsApiServer.per_page)

      if (newsApiServer.page >= numberOfLastPage) {
        loadBtn.style.display = "none";
      }
      if (data.totalHits <= newsApiServer.totalImages) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        newsApiServer.totalImages = 0;
      }
    })
    .catch(error => console.log(error.message));
}


function appendPhotoMarkup(data) {
  gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
}


function clearPage() {
  gallery.innerHTML = '';
  newsApiServer.page = 1;
  newsApiServer.resetPage();
  newsApiServer.totalImages = 0;
}