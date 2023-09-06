import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAllArticles } from "../utils/api";


function Articles() {
    const [articles, setArticles] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        getAllArticles()
        .then(({data}) => {
            setArticles(data)
            setIsLoading(false)
        })
        
    }, [])

    if(isLoading) return (<p>Loading....</p>)

    return (
        <>
        <section>Current topic: filter by, dropdown menu</section>

        {articles.map(({article_id, article_img_url, author, comment_count, title, topic, created_at}) => {
            return <div key={article_id}className="article-window">
                
                <div className="article-window-content">
                    <img className="article-window-img"src={article_img_url} alt={`Image relating to ${topic}`}/>  
                    <Link to={`/articles/${topic}/${article_id}`}><p>{title}</p></Link>
                    <section>{topic}</section>
                    <section>Comments: {comment_count}</section>
                    <section>Created at {new Date(created_at).toDateString()} by {author}</section>
                </div>
            </div>
        })}
        </>
    )
}

export default Articles;