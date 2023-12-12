import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';
// import '/node_modules/slim-select/dist/slimselect.css';

import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";

const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const info = document.querySelector(".cat-info")

function hideLoader() {
  loader.style.visibility = 'hidden';
}

function showError(message) {
  error.style.display = 'block';
  Notiflix.Notify.failure(message);
}

breedSelect.style.visibility = 'hidden';
error.style.display = 'none';

fetchBreeds()
  .then(breeds => {
    breedSelect.style.visibility = 'visible';
    hideLoader();
    const catsBreeds = breeds
    .map(breed => `
    <option value="${breed.id}">${breed.name}</option>
    `).join('');
    breedSelect.insertAdjacentHTML('beforeend', catsBreeds);
  })
  .catch(error => {
    hideLoader();
    showError();
  });

breedSelect.addEventListener('change', handleChange);
 
function handleChange() {
    const selectedBreedId = breedSelect.value;
    info.innerHTML = "";
    Notiflix.Notify.info('Loading data, please wait...');

  fetchCatByBreed(selectedBreedId)
    .then(breeds => {
      hideLoader();
      const data = breeds[0];
      console.log(data);
      info.innerHTML = `
        <div><img src="${data.url}" alt="${data.breeds[0].name}" width ="300px"/></div>
        <div>
        <h3>${data.breeds[0].name}</h3>
        <p>${data.breeds[0].description}</p>
        <h4>Temperament</h4>
        <p>${data.breeds[0].temperament}</p>
        </div>
        `;
      
      info.style.display = 'flex';
      info.style.gap = '30px';
      info.style.width = '600px';
    })

    .catch(error => {
      hideLoader();
      showError()
    });
}
