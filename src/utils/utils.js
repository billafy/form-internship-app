import {
	FaUser,
	FaBirthdayCake,
	FaGenderless,
	FaHome,
	FaPhone,
	FaMailBulk,
} from "react-icons/fa";

export const defaultInput = {
	firstName: "",
	lastName: "",
	dateOfBirth: "",
	gender: "Male",
	address: "",
	contactNumber: "",
	email: "",
	profilePicture:
		"https://www.voanews.com/themes/custom/voa/images/Author__Placeholder.png",
};

export const personalDetailsInput = [
	{
		id: 1,
		text: "First Name",
		type: "text",
		name: "firstName",
		icon: <FaUser />,
	},
	{
		id: 2,
		text: "Last Name",
		type: "text",
		name: "lastName",
		icon: <FaUser />,
	},
	{
		id: 3,
		text: "Date of Birth",
		type: "date",
		name: "dateOfBirth",
		icon: <FaBirthdayCake />,
	},
	{
		id: 4,
		text: "Gender",
		type: "select",
		options: ["Male", "Female", "Other"],
		name: "gender",
		icon: <FaGenderless />,
	},
];

export const contactInformationInput = [
	{
		id: 1,
		text: "Address",
		type: "textarea",
		name: "address",
		icon: <FaHome />,
	},
	{
		id: 2,
		text: "Contact Number",
		type: "tel",
		name: "contactNumber",
		icon: <FaPhone />,
	},
	{
		id: 3,
		text: "Email",
		type: "text",
		name: "email",
		icon: <FaMailBulk />,
	},
];
