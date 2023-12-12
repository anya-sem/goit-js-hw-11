import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_VqTKudowkBGF5i9vUqI85fPVf6H6eUW4YleEymu5lYRf1iQxelXzHvqGj24Q5Y1a";

function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      console.log(error);
      throw new Error(error);
    });
}

export { fetchBreeds, fetchCatByBreed };