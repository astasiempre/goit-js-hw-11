import axios from 'axios';

async function getImage() {
    const url = 'https://pixabay.com/api/';
    const API_KEY = '38912388-dfab1f4f09b0fb6a50a23584e';
    const params = {
        key: API_KEY,
        q: 'dog',
        // q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: 1,
        per_page: 40,
    }
    
    const resp = await axios.get(url[params]);
    const data = resp.json();
    console.log(resp);
    
}

getImage()