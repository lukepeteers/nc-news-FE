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

export const getArticle = (article_id, property) => {
    if(property) {
        return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then(({data}) => {
        const chosenProperty = data.article[property]
        return chosenProperty
    })
    } else {
    return axios.get(`${BASE_URL}/articles/${article_id}`)
    .then((data) => {
        return data
    })
    }
}

export const getComments = (article_id) => {
    return axios.get(`${BASE_URL}/articles/${article_id}/comments`)
    .then((data) => {
        return data
    })
}

export const updateArticleVotes = (article_id, inc_votes) => {
    return axios.patch(`${BASE_URL}/articles/${article_id}`, {inc_votes})
    .then((data) => {
        console.log('+1')
        return data
    })
}