import axios from 'axios';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async e => {
  e.preventDefault();
  console.log(e);
  const searchQuery = e.target.elements.searchQuery.value;
  // Виклик функції для виконання запиту до API з використанням Axios
  
  const getImage = async function (searchQuery) {
    try {
      const URL = 'https://pixabay.com/api/';
      // const URL = 'https://pixabay.com/api/?key=38912388-dfab1f4f09b0fb6a50a23584e&q=dog&image_type=photo';
      const API_KEY = '38912388-dfab1f4f09b0fb6a50a23584e';
      const params = new URLSearchParams({
        key: API_KEY,
        q: 'dog',
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
    gallery.innerHTML = createMarkup(data.hits);
      
    //   const { data } = await axios.get(`${URL}?${params}`);
      // const data = resp.json();
      
      // console.log(resp)
      // return data;
    //   gallery.innerHTML = createMarkUp(data);
    } catch (error) {
      console.log(error);
    }
  };
 getImage(searchQuery);

//   function createMarkUp(images) {
//     return images
//       .map(
//         ({
//           hits: { webformatURL, comments, likes, views, tags }
//         }) => `<div class="photo-card">
//   <img src="${webformatURL}" alt="${tags}" loading="lazy"  />
//   <div class="info">
//     <p class="info-item">
//       <b>Likes: ${likes}</b>
//     </p>
//     <p class="info-item">
//       <b>Views: ${views}</b>
//     </p>
//     <p class="info-item">
//       <b>Comments: ${comments}</b>`
//       )
//           .join('');
      
//     }
    function createMarkup(images) {
  return images
    .map(
      ({ webformatURL, comments, likes, views, tags }) => `
      <div class="photo-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300/>
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
    `
    )
    .join('');
}

});
