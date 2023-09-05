import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle } from "../utils/api";

function SingleArticle() {
    const [currentArticle, setCurrentArticle] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const {article_id, topic} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
        .then(({data}) => {
            setCurrentArticle(data)
            setIsLoading(false)
        })
    }, []) 

    if(isLoading === true) return (<p>Loading....</p>)

    if(currentArticle.hasOwnProperty('article')) {
    return (
        <div className="single-article-window">
            <article className="single-article-window-content">
                <img className="single-article-window-img"src={currentArticle.article.article_img_url}/>
                <p>{currentArticle.article.title}</p>
                <p>{`by ${currentArticle.article.author}`}</p>
                <p>{currentArticle.article.body}</p>
                <p>{`votes: ${currentArticle.article.votes}`}</p>
                <p>{`created at: ${currentArticle.article.created_at}`}</p>
            </article>
        </div>
    )
    }
}

export default SingleArticle;