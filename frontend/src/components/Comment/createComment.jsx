import { useState } from "react";
import { createComment } from "../../services/createComment";
import "./createComment.css";
import DOMpurify from "dompurify";

const CreateComment = (props) => {
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
    console.log(newComment);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postby = localStorage.getItem("postby");
    const post_id = props.post_id;
    let CleanNewComment = DOMpurify.sanitize(newComment);
    if (CleanNewComment.length < 1) {
      setError("Comment can't be empty!");
      return;
    }

    try {
      createComment(CleanNewComment, token, postby, post_id).then((data) => {
        // console.log("newPost value: ", newPost);
        // console.log("data value: ", data);
        // console.log("author: ", postby);
        location.reload();
        localStorage.setItem("token", data.token);
      });

      console.log("updating post...:");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="createCommentContainer">
      <form id="newCommentForm" onSubmit={handleSubmit}>
        <textarea
          id="newComment"
          type="text"
          value={newComment}
          onChange={handleCommentChange}
        />
        <br />
        {error && <p className="error">{error}</p>}
        <input
          role="submit-button"
          id="submitComment"
          type="submit"
          value="Add comment"
        />
      </form>
    </div>
  );
};

export default CreateComment;
