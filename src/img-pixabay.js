const axios = require('axios').default;

export default class ImgPixabay {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getImgFunc = async () => {
    const baseUrl = 'https://pixabay.com/api/';
    const key = '27146874-6a4ead2ef4bbc8421b81b25a7';

    const response = await axios.get(
      `${baseUrl}?key=${key}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&q=${this.searchQuery}&page=${this.page}`,
    );

    console.log(response);
    return response.data;
  };
  getImg = async () => {
    try {
      const response = await this.getImgFunc({});
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  resetPage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
