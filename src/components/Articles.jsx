import { useState, useEffect } from "react";
import { getArticles } from "../utils/api";


function Articles() {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        console.log('in use effect')
        getArticles()
        .then(({data}) => {
            setArticles(data)
        })
    }, [])

    return (
        <>
        <section>Current topic: filter by, dropdown menu</section>
        {articles.map(({article_img_url, author, comment_count, title, topic, created_at}) => {
            return <div class="article-window">
                <img class="article-window-img"src={article_img_url}/>
                <p>{title}</p>
                <p>{topic}</p>
                <p>Comments: {comment_count}</p>
                <p>Created at {created_at} by {author}</p>
            </div>
        })}
        </>
    )
}

export default Articles;