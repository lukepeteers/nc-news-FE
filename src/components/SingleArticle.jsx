import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments, updateArticleVotes } from "../utils/api";
import Comments from "./Comments";

function SingleArticle() {
    const [currentArticle, setCurrentArticle] = useState({})
    const [currentVotes, setCurrentVotes] = useState(0)
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {article_id, topic} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getArticle(article_id)
        .then(({data}) => {
            setCurrentArticle(data)
            setCurrentVotes(data.article.votes)
            
        })

        getComments(article_id)
        .then(({data}) => {
            setComments(data)
            setIsLoading(false)
        })
    }, []) 

    const handleVoting = (e) => {
        if(e.target.innerText === "Plus") {
            setCurrentVotes(currentVotes + 1)
            updateArticleVotes(article_id, 1)
            .catch((err) => {
                alert('Something went wrong. Try again later')
                setCurrentVotes(currentVotes - 1)
            })
        } else if(e.target.innerText === "Minus") {
            setCurrentVotes(currentVotes - 1)
            updateArticleVotes(article_id, -1)
            .catch((err) => {
                alert('Something went wrong. Try again later')
                setCurrentVotes(currentVotes + 1)
            })
        }
    }

    if(isLoading) return (<p>Loading....</p>)

    if(Object.keys(currentArticle).length !== 0) {
    return (
        <>
        <div className="single-article-window">
            <article className="single-article-window-content">
                <img className="single-article-window-img"src={currentArticle.article.article_img_url} alt={`Image relating to ${currentArticle.article.topic}`}/>
                <section>{currentArticle.article.title}</section>
                <section>{`by ${currentArticle.article.author}`}</section>
                <p>{currentArticle.article.body}</p>
                <button onClick={handleVoting}>Plus</button>
                <span>{` -- votes: ${currentVotes} -- `}</span>
                <button onClick={handleVoting}>Minus</button>
                
                <section>{`created at: ${new Date(currentArticle.article.created_at).toDateString()}`}</section>
            </article>
        </div>
        <Comments></Comments>
        </>
    )
    }
}

export default SingleArticle;