import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments } from "../utils/api";
import Comments from "./Comments";

function SingleArticle() {
    const [currentArticle, setCurrentArticle] = useState({})
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {article_id, topic} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
        .then(({data}) => {
            setCurrentArticle(data)
            
        })

        getComments(article_id)
        .then(({data}) => {
            setComments(data)
            setIsLoading(false)
        })
    }, []) 

    if(isLoading) return (<p>Loading....</p>)

    if(currentArticle.hasOwnProperty('article')) {
    return (
        <>
        <div className="single-article-window">
            <article className="single-article-window-content">
                <img className="single-article-window-img"src={currentArticle.article.article_img_url} alt={`Image relating to ${currentArticle.article.topic}`}/>
                <section>{currentArticle.article.title}</section>
                <section>{`by ${currentArticle.article.author}`}</section>
                <p>{currentArticle.article.body}</p>
                <section>{`votes: ${currentArticle.article.votes}`}</section>
                <section>{`created at: ${new Date(currentArticle.article.created_at).toDateString()}`}</section>
            </article>
        </div>
        <Comments></Comments>
        </>
    )
    }
}

export default SingleArticle;