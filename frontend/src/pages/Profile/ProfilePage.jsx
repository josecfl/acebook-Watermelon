import Navbar from "../../components/Navbar";
import Upload from "../../components/Upload";
import Bio from "./Bio";
// import Download from "../../components/Download";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyProfile } from "../../services/profile";
import "./Profile.css";

const ProfilePage = () => {
  const [bio, setBio] = useState("");
  const [username, setUsername] = useState("");
  const [profilePictureURL, setProfilePictureURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getMyProfile(token)
        .then((data) => {
          console.log("checking data: ", data);
          setUsername(data.profile.author.username);
          setBio(data.profile.bio);
          setProfilePictureURL(data.profile.profilePictureURL);

          // console.log("feedpage, data.posts: ", data.posts[0].author.username);

          localStorage.setItem("token", data.token);
        })
        .catch((err) => {
          console.log("error for getMyProfile");
          console.error(err);
          // navigate("/login");
        });
    }
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <h1 className="profiletitle">Profile</h1>
      <br />
      <img
        src={`http://localhost:3000/${profilePictureURL}`}
        alt="Profile Picture"
      />
      <Upload />
      <br />
      <Bio bio={bio} setBio={setBio} username={username} />
    </div>
  );
};
export default ProfilePage;
