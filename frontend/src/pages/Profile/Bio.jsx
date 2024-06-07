import "./Profile.css";

// import "./bio.css";
import { useState } from "react";
// import { updateMyBio } from "../../services/updateBio";
import { updateProfile } from "../../services/updateProfile";

import DOMPurify from "dompurify";

const Bio = ({ bio, setBio, username }) => {
  const [newbio, setNewBio] = useState("");
  const handleBioChange = (event) => {
    setNewBio(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const sanitizedBio = DOMPurify.sanitize(newbio);


    try {
      await updateProfile(token, { bio: sanitizedBio }).then(
        (data) => console.log("!!data:", data, "sanatized bio: ", sanitizedBio),
        setBio(sanitizedBio),
        setNewBio("")
        
      );

      // location.reload();
    } catch (err) {
      console.error(err);
    }
    // const CleanBio = DOMpurify.sanitize(bio);
  };
  return (
    <div>
      <h3 className="usernametitle">Username</h3>
      <p className="bio"> {username}</p>
      <div className="bio_container">
        <h4 className="biotitle">Bio</h4>
        <p className="bio"> {bio}</p>
        <form onSubmit={handleSubmit}>
          <div className="biochangeform">
          <div className="input-wrapper">
          <input
            className="bioinput"
            placeholder="Type here"
            name="text"
            id="bio"
            type="text"
            value={newbio}
            onChange={handleBioChange}
          />
          </div>
          <button className="updatebutton" type="submit">Update</button>
          <br/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bio;
