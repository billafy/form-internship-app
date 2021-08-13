import React, { useState } from "react";

import "../Form/styles.scss";

import Loading from "../Loading";

import "./styles.scss";

import { useForm } from "../../context/formContext";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Link } from "react-router-dom";

const UploadProfilePicture = () => {
  const {
    formInput: { profilePicture },
    uploadProfilePicture,
  } = useForm();
  const [loading, setLoading] = useState(false);

  const changeHandler = async (event) => {
    setLoading(true);
    await uploadProfilePicture(event);
    setLoading(false);
  };

  return (
    <div className="form-container">
      <Link to="/contact-information">
        <FaArrowLeft />
      </Link>
      <h1 className="title">Upload a Profile Picture</h1>
      <div className="profile-picture">
        <img src={profilePicture} alt='Profile'/>
      </div>
      <label className="upload-profile-picture" htmlFor="profilePicture">
        <input
          id="profilePicture"
          type="file"
          accept="image/*"
          onChange={changeHandler}
        />
        Upload
      </label>
      {loading && <Loading />}
      <Link to="/" disabled={loading}>
        <button className="submit">
          <FaArrowRight />
        </button>
      </Link>
    </div>
  );
};

export default UploadProfilePicture;
