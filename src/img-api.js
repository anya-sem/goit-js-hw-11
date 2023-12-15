import axios from "axios";

const API_KEY = "41218356-e420c026351ed95eb23209a0b";
const URL = 'https://pixabay.com/api/';

export class NewsApiServer {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
    this.totalImages = 0;
  }

  async fetchImages() {
    try {
      const response = await axios.get(
        `${URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`
      );
      this.page += 1;

      // console.log('response.data', response.data);
      return response.data;
      
    } catch (error) {
      console.log(error.message);
    }
  }

  resetPage() {
    this.page = 1;
  }
}

