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
            console.log(data)
            setComments(data)
            setIsLoading(false)
        })
    }, [])

    if(isLoading === true) return (<p>Loading....</p>)

    return (

        <>
             <section className="comments-window">
                <h4>Comments</h4>
                {comments.map(({article_id, author, body, comment_id, created_at, votes}) => {
                    return (
                        <div key={comment_id}className="comments-window-content">
                            <section>{`${author} - posted at: ${created_at}`}</section>
                            <p>{body}</p>
                            <section>{`votes: ${votes}`}</section>   
                        </div>
                    )
                })}

            </section>
        </>
    )
}

export default Comments;