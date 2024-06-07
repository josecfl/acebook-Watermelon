// eslint-disable-next-line no-unused-vars

// import { updateMyImage } from "../services/updateImage";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { updateProfile } from "../services/updateProfile";

const Upload = () => {
  const [file, setFile] = useState(null);
  // const [image, setImage] = useState("");
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profilepicture", file);

    // formData.append('bio', '');
    console.log("file: ", file);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/routes/profileUpload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const updatedProfile = await updateProfile(token, {
        profilePictureURL: res.data.path,
      });
      console.log("res.data.path: ", res.data.path);
      setFile(updatedProfile.profilePictureURL);
      location.reload();
      console.log(res.data.path);
    } catch (err) {
      console.error(err);
    }
  };

  // formData.append('bio', '');
  // const token = localStorage.getItem('token');

  // try {
  //     const res = await axios.post("http://localhost:3000/api/routes/profileUpload", formData, {
  //         headers: { "Content-Type": "multipart/form-data",
  //         'Authorization': `Bearer ${token}`
  //         },
  //     });
  //     console.log(res.data.path);
  // } catch (error) {
  //     console.error('Error', error);
  // }

  return (
    <form id="form" onSubmit={handleSubmit} encType="multipart-form-data">
      <input className="choosefile" id="file" type="file" onChange={handleFileChange} />
      <button className="uploadbutton" type="submit">Upload</button>
      <hr></hr>
    </form>
  );
};

export default Upload;
