import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticle, getComments, postComment } from "../utils/api";

function Comments({ user }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { article_id } = useParams();
  const [commentToPost, setCommentToPost] = useState({
    article_id,
    author: user,
    body: "",
    created_at: "",
    votes: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    getComments(article_id).then(({ data }) => {
      setComments(data);
      setIsLoading(false);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (commentToPost.body === "") {
      alert("You cannot post an empty comment");
    } else if(commentToPost.body.length > 200) {
        alert('Comment exceeded maximum 200 characters')
    }else {
      setCommentToPost((currToPost) => {
        const now = new Date().toISOString();
        return {
          ...currToPost,
          created_at: now,
        };
      });

      setComments((currComments) => {
        const commentsCopy = [...currComments];
        commentsCopy.unshift(commentToPost);
        
        return commentsCopy;
      });

      postComment(article_id, {
        username: commentToPost.author,
        body: commentToPost.body
      })
      .catch((err) => {
        setComments((currComments) => {
            const commentsCopy = [...currComments]
            commentsCopy.shift()
            return commentsCopy
        })
        alert('Something went wrong. Try again later.')
        console.log(err)
      })
      alert('Your comment has been successfully posted!')
      setCommentToPost({
        article_id,
        author: user,
        body: "",
        created_at: "",
        votes: 0,
      })
    }


  };

  if (isLoading) return <p>Loading....</p>;
  if (comments.length === 0)
    return (
      <>
        <h4>Comments</h4>
        <p>There are no comments for this article.</p>
      </>
    );

  return (
    <>
      <section onSubmit={handleSubmit} className="post-comment-window">
        <form>
          <label>
            <input
            value={commentToPost.body}
              onChange={(event) => {
                setCommentToPost((currToPost) => {
                  const now = new Date().toISOString();
                  return {
                    ...currToPost,
                    body: event.target.value,
                    created_at: now,
                  };
                });
              }}
              className="input-window"
              placeholder="Type your comment here....."
            ></input>
          </label>
          <button type="submit">Post</button>
        </form>
      </section>
      <ul className="comments-window">
        <h4>Comments</h4>
        {comments.map(
          ({ author, body, comment_id, created_at, votes }) => {
            return (
              <li key={comment_id} className="comments-window-content">
                <section>{`${author} - posted at: ${new Date(
                  created_at
                ).toDateString()}`}</section>
                <p>{body}</p>
                <section>{`votes: ${votes}`}</section>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
}

export default Comments;
