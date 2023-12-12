// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
// import { createMarkup } from './markup.js';
// import { fetchImages } from "./img-api.js";

// export const refs = {
//   search: document.querySelector('.search-form'),
//   gallery: document.querySelector('.gallery'),
//   loadBtn: document.querySelector('.load-more'),
// };


// let page = 1;
// const perPage = 40;
// const searchQuery = '';
// refs.loadBtn.style.display = 'none';

// refs.search.addEventListener('submit', function (event) {
//   event.preventDefault();
//   page = 1;
//   refs.gallery.innerHTML = '';
//   searchQuery = event.currentTarget.elements.searchQuery.value.trim();

//   if (searchQuery === '') {
//     Notiflix.Notify.warning('Please enter a search query');
//     return;
//   }
//    try {
//     const data = fetchImages(searchQuery, page, perPage);
//     handleSearchResults(data);
//   } catch (error) {
//     console.error('Error searching images:', error);
//     Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
//   }

//   // handleImagesResult();
// });

// fetchImages(searchQuery, page, perPage)
//   .then(data => {
//     const searchResults = data.hits;
//     if (data.totalHits === 0) {
//       refs.gallery.innerHTML = '';
//       Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
//     }

//     if (page === 1) {
//       refs.gallery.innerHTML = '';
//       Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
      
//       createMarkup(searchResults);

//       const lightbox = new SimpleLightbox('.gallery a', {
//       captionsData: 'alt',
//       captionDelay: 250,
//       captionPosition: 'bottom',
//     });
//     }

//     if (data.totalHits > perPage) {
//       refs.loadBtn.style.display = 'block';
//     } else {
//       refs.loadBtn.style.display = 'none';
//       Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     }
    
//   });



// refs.loadBtn.addEventListener('click', async function () {
//   page++;
//   // try {
//   //   const { hits, totalHits } = await fetchImages(searchQuery, page);
//   //   handleImagesResult(hits, totalHits);
//   // } catch (error) {
//   //   console.error('Error:', error);
//   //   Notiflix.Notify.failure('Error fetching more images. Please try again later.');
//   // }
//    try {
//     const result = await fetchImages(searchQuery, page, perPage);
//     const searchResults = result.hits;
//     const numberOfLastPage = Math.ceil(result.totalHits / perPage);
//     createMarkup(searchResults);

//     if (page === numberOfLastPage) {
//       refs.loadBtn.style.display = 'none';
//       Notiflix.Notify.info('We`re soory, but you`ve reached the end of search results.');
//       refs.loadBtn.removeEventListener();
//     }
//   } catch (error) {
//      Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
//    }
// });


import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { createMarkup } from './markup.js';
import { fetchImages } from "./img-api.js";

export const refs = {
  search: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

let page = 1;
const perPage = 40;
let searchQuery = '';
refs.loadBtn.style.display = 'none';

refs.search.addEventListener('submit', async function (event) {
  event.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  searchQuery = event.currentTarget.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    Notiflix.Notify.warning('Please enter a search query');
    return;
  }

  try {
    const data = await fetchImages(searchQuery, page, perPage);
    handleSearchResults(data);
  } catch (error) {
    console.error('Error searching images:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
  }
});

refs.loadBtn.addEventListener('click', async function () {
  page++;
  try {
    const result = await fetchImages(searchQuery, page, perPage);
    handleLoadMoreResults(result);
  } catch (error) {
    console.error('Error loading more images:', error);
    Notiflix.Notify.failure('Oops! Something went wrong. Please, try again.');
  }
});

function handleSearchResults(data) {
  const searchResults = data.hits;
  if (data.totalHits === 0) {
    Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
  }

  if (page === 1) {
    Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images`);
    createMarkup(searchResults);

    const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
      captionPosition: 'bottom',
    });

    if (data.totalHits > perPage) {
      refs.loadBtn.style.display = 'block';
    } else {
      refs.loadBtn.style.display = 'none';
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
  }
}

// function handleLoadMoreResults(result) {
//   const searchResults = result.hits;
//   const numberOfLastPage = Math.ceil(result.totalHits / perPage);
//   createMarkup(searchResults);

//   if (page === numberOfLastPage) {
//     refs.loadBtn.style.display = 'none';
//     Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
//     refs.loadBtn.removeEventListener();
//   }
// }
