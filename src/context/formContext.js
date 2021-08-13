import React, { useState, useContext } from "react";

import { defaultInput } from "../utils/utils";

const FormContext = React.createContext();

export const useForm = () => {
	return useContext(FormContext);
};

export const FormProvider = ({ children }) => {
	const [formInput, setFormInput] = useState(defaultInput);
	const [loading, setLoading] = useState(false);

	const updateInput = (name, value) => {
		const newFormInput = formInput;
		newFormInput[name] = value;
		setFormInput({ ...newFormInput });
	};

	const validatePersonalDetails = () => {
		const { firstName, lastName, dateOfBirth, gender } = formInput;
		if (!firstName || !lastName || !dateOfBirth || !gender)
			return [false, "Fill all the fields"];
		return [true];
	};

	const validateContactInformation = () => {
		const { contactNumber, email, address } = formInput;
		if (!contactNumber || !email || !address)
			return [false, "Fill all the fields"];
		return [true];
	};

	const validateField = (name) => {
		if (!formInput[name]) return [false, "This field is required"];
		const value = formInput[name];
		if (name === "contactNumber") {
			if (isNaN(Number(value)) || value.length !== 10)
				return [false, "Invalid contact number"];
		} else if (name === "email") {
			const [identifier, server] = value.split("@");
			if (value.split("@").length > 2 || !identifier || !server)
				return [false, "Invalid email address"];
			const [provider, tld] = server.split(".");
			if (server.split(".").length > 2 || !provider || !tld)
				return [false, "Invalid email address"];
		}
		return [true];
	};

	const uploadProfilePicture = async (event) => {
		const image = event.target.files[0];
		const formData = new FormData();
		formData.append("image", image);
		const response = await fetch(
			process.env.REACT_APP_IMAGE_UPLOAD_URL,
			{
				method: "POST",
				body: formData,
			}
		);
		const data = await response.json();
		if (data.success) updateInput("profilePicture", data.data.image.url);
	};

	return (
		<FormContext.Provider
			value={{
				formInput,
				updateInput,
				setLoading,
				validatePersonalDetails,
				validateField,
				validateContactInformation,
				uploadProfilePicture,
			}}
		>
			{!loading && children}
		</FormContext.Provider>
	);
};
