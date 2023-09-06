import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments } from "../utils/api";

function Comments() {
    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const {article_id} = useParams()

    useEffect(() => {
        setIsLoading(true)
        getComments(article_id)
        .then(({data}) => {
            setComments(data)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) return (<p>Loading....</p>)
    if(comments.length === 0) return (
     <>
    <h4>Comments</h4>
    <p>There are no comments for this article.</p>
    </>
    )

    return (

        <>
             <ul className="comments-window">
                <h4>Comments</h4>
                {comments.map(({article_id, author, body, comment_id, created_at, votes}) => {
                    return (
                        <li key={comment_id}className="comments-window-content">
                            <section>{`${author} - posted at: ${new Date(created_at).toDateString()}`}</section>
                            <p>{body}</p>
                            <section>{`votes: ${votes}`}</section>   
                        </li>
                    )
                })}

            </ul>
        </>
    )
}

export default Comments;