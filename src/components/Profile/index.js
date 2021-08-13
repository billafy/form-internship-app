import React from "react";
import { useForm } from "../../context/formContext";
import { IoMdMale, IoMdFemale, IoMdTransgender } from "react-icons/io";

import "./styles.scss";

const Profile = () => {
	const {
		formInput: {
			firstName,
			lastName,
			gender,
			dateOfBirth,
			address,
			contactNumber,
			email,
			profilePicture,
		},
	} = useForm();
	const info = [
		{
			name: "Date of Birth",
			value: dateOfBirth,
		},
		{
			name: "Address",
			value: address,
		},
		{
			name: "Contact Number",
			value: contactNumber,
		},
		{
			name: "Email",
			value: email,
		},
	];

	const genderIcon = () => {
		if (gender === "Male") return <IoMdMale style={{ color: "#0080FF" }} />;
		else if (gender === "Female")
			return <IoMdFemale style={{ color: "#FC8EAC" }} />;
		else return <IoMdTransgender style={{ color: "#00CC00" }} />;
	};

	return (
		<div className="form-container profile-container">
			<h1 className="title">Profile</h1>
			<div className="profile-picture">
				<img src={profilePicture} alt='Profile'/>
			</div>
			<p className="profile-name">
				{firstName} {lastName} {genderIcon()}
			</p>
			<section className="info">
				{info.map((field) => {
					return (
						<div key={field.name} className="info-field">
							<p>{field.name}</p>
							<span>{field.value}</span>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default Profile;
