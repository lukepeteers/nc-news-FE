import axios from 'axios';

const BASE_URL = 'https://nc-news-kh78.onrender.com/api'

export const getAllArticles = () => {
    return axios.get(`${BASE_URL}/articles`)
    .then((data) => {
        return data
    })
    .catch((err) => {
        console.log(err)
    })
}

export const getArticle = (article_id) => {
    return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then((data) => {
        return data
    })
}

