import { useState } from "react";

import { createPost } from "../services/createPost";
import "./CreatePost.css";
import DOMpurify from "dompurify";

const CreatePost = () => {
  const [newPost, setNewPost] = useState("");
  const [error, setError] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
    console.log(newPost);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const postby = localStorage.getItem("postby");
    let CleanNewPost = DOMpurify.sanitize(newPost);
    if (CleanNewPost.length < 1) {
      setError("Post can't be empty!");
      return;
    }
    try {
      createPost(CleanNewPost, token, postby).then((data) => {
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
    <div>
      <h2 id="newPostTitle">Write a post...</h2>

      <div id="createPostContainer">
        <form id="newPostForm" onSubmit={handleSubmit}>
          <textarea
            id="newpost"
            type="text"
            value={newPost}
            onChange={handlePostChange}
          />
          <br />
          {error && <p className="error">{error}</p>}
          <input
            role="submit-button"
            id="submitPost"
            type="submit"
            value="Post"
          />
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
