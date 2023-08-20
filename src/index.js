import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more');
const lightbox = new SimpleLightbox('.photo-link'); 


const URL = 'https://pixabay.com/api/';
const API_KEY = '38912388-dfab1f4f09b0fb6a50a23584e';
let searchQuery = '';

loadMore.style.display = 'none'; 

form.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(e);
  searchQuery = e.target.elements.searchQuery.value;

  const getImage = async function (searchQuery) {
    try {
      const params = new URLSearchParams({
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
      });
      const response = await axios.get(`${URL}?${params}`);
      const data = response.data;
      console.log(data);
      Notiflix.Notify.info(
        `Hooray! We found ${ data.totalHits } images.`
      );
      gallery.innerHTML = createMarkup(data.hits);
      if (data.hits.length === 40) {
        loadMore.style.display = 'block';
      }
      lightbox.refresh(); 
      
    } catch (error) {
      console.log(error);
    }
  };
  getImage(searchQuery);
});

function createMarkup(images) {
  return images
    .map(
      ({ webformatURL, comments, likes, views, tags, largeImageURL
 }) => `
      <a href="${largeImageURL
}" class="photo-link">
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300 height=200/>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
        </div>
      </div>
      </a>
    `
    )
    .join('');
}

let currentPage = 9;
loadMore.addEventListener('click', onLoadMore);
async function onLoadMore() {
  currentPage += 1;
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: currentPage,
      per_page: 40,
    });
    const response = await axios.get(`${URL}?${params}`);
    const data = response.data;
    console.log(data);
    gallery.insertAdjacentHTML('beforeend', createMarkup(data.hits));
    if (data.totalHits <= currentPage * 40) {
      loadMore.style.display = 'none'; 
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
  } catch (error) {
    console.error('Error fetching more images:', error);
  }
}


