import axios from "axios";

const API_KEY = "41218356-e420c026351ed95eb23209a0b";

async function fetchImages(searchQuery, page) {
  try {
    const perPage = 40;

    const response = await axios.get('https://pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

export { fetchImages };
