import './css/styles.css';
import ImgPixabay from './img-pixabay.js';
import { makeGallery } from './make-gallery.js';
import Notiflix from 'notiflix';

export const refs = {
  searchForm: document.querySelector('.search-form'),
  imgContainer: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const imgPixabay = new ImgPixabay();
refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onBtnClick);
refs.loadMoreBtn.style.display = 'none';

function onSearch(e) {
  refs.loadMoreBtn.style.display = 'none';
  totalHitsNull();
  e.preventDefault();
  imgPixabay.page = 1;
  clearImgContainer();
  imgPixabay.query = e.currentTarget.elements.searchQuery.value.trim();
  imgPixabay.getImg().then(makeGallery);
  imgPixabay.resetPage();

  if (imgPixabay.query === '') {
    return Notiflix.Notify.warning('Please, enter something!');
  }
}

function onBtnClick() {
  imgPixabay.page += 1;
  imgPixabay.getImg().then(makeGallery);
}

function clearImgContainer() {
  refs.imgContainer.innerHTML = '';
}

let totalHitsCount = 0;
export function totalHitsMessage(item) {
  totalHitsCount = totalHitsCount + 40;
  if (item.totalHits - totalHitsCount >= 1) {
    refs.loadMoreBtn.style.display = 'block';
  }
  if (item.totalHits - totalHitsCount < 1 && item.totalHits !== 0) {
    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.style.display = 'none';
  }
  if (imgPixabay.page === 1 && item.totalHits !== 0) {
    Notiflix.Notify.info(`Hooray! We found ${item.totalHits} images.`);
  }
  console.log(totalHitsCount);
}

function totalHitsNull() {
  totalHitsCount = 0;
}
