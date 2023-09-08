import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, updateArticleVotes } from "../utils/api";

function ArticleVoting() {
    const [currentVotes, setCurrentVotes] = useState(0)
    const {article_id} = useParams()
    useEffect(() => {

        getArticle(article_id, 'votes')
        .then((data) => {
            setCurrentVotes(data)
         
        })
    }, [])

    const handleVotePlus = (e) => {
        setCurrentVotes((currVotes) => {
            return currVotes + 1
        })
        updateArticleVotes(article_id, 1)
        .catch((err) => {
            alert('Something went wrong. Try again later')
            setCurrentVotes((currVotes) => {
                return currVotes - 1
            })
        })
    }

    const handleVoteMinus = () => {
        setCurrentVotes((currVotes) => {
            return currVotes - 1
        })
        updateArticleVotes(article_id, -1)
        .catch((err) => {
            alert('Something went wrong. Try again later')
            setCurrentVotes((currVotes) => {
                return currVotes + 1
            })
        })
    }

    return (
        <>
                <button onClick={handleVotePlus}>Plus</button>
                <span>{` -- votes: ${currentVotes} -- `}</span>
                <button onClick={handleVoteMinus}>Minus</button>
        </>
    )
}

export default ArticleVoting;