import axios from 'axios';

const BASE_URL = 'https://nc-news-kh78.onrender.com/api'

export const getArticles = () => {
    return axios.get(`${BASE_URL}/articles`)
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.log(err)
    })
}

