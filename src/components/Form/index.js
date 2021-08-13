import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "../../context/formContext";

import { FaArrowLeft } from "react-icons/fa";

import "./styles.scss";

const Form = ({ title, fields, submitButton, link, validator }) => {
	const [inputFields, setInputFields] = useState(fields);
	const [error, setError] = useState("");
	const { formInput, updateInput, validateField } = useForm();
	const validate = useForm()[validator];
	const history = useHistory();

	const submitHandler = (event) => {
		event.preventDefault();
		const [valid, err] = validate();
		if (valid) history.push(submitButton.href);
		else setError(err);
	};

	const changeHandler = (name, value) => {
		updateInput(name, value);
		blurHandler(name);
	};

	const blurHandler = (name) => {
		const [valid, err] = validateField(name);
		if (!valid)
			setInputFields((prev) => {
				return prev.map((field) => {
					if (field.name === name) return { ...field, error: err };
					return field;
				});
			});
		else
			setInputFields((prev) => {
				return prev.map((field) => {
					if (field.name === name) return { ...field, error: "" };
					return field;
				});
			});
	};

	const getInputField = (field) => {
		if (field.type === "select") {
			return (
				<select
					value={formInput[field.name]}
					onChange={({ target: { value } }) => changeHandler(field.name, value)}
					onBlur={() => blurHandler(field.name)}
				>
					{field.options.map((option) => (
						<option key={option} value={option}>
							{option}
						</option>
					))}
				</select>
			);
		} else if (field.type === "textarea") {
			return (
				<textarea
					placeholder={field.text}
					value={formInput[field.name]}
					onChange={({ target: { value } }) => changeHandler(field.name, value)}
					onBlur={() => blurHandler(field.name)}
				/>
			);
		}
		return (
			<input
				type={field.type}
				placeholder={field.text}
				value={formInput[field.name]}
				onChange={({ target: { value } }) => changeHandler(field.name, value)}
				onBlur={() => blurHandler(field.name)}
			/>
		);
	};

	useEffect(() => {
		if (!error) return;
		setTimeout(() => setError(""), 3000);
	}, [error]);

	return (
		<div className="form-container">
			{link && (
				<Link to={link.href}>
					<FaArrowLeft />
				</Link>
			)}
			<h1 className="title">{title}</h1>
			<form className="form">
				{inputFields &&
					inputFields.map((field) => {
						return (
							<div className="input-container" key={field.id}>
								{field.icon}
								{getInputField(field)}
								{field.error && <p className="input-error">{field.error}</p>}
							</div>
						);
					})}
				<p className="form-error">&nbsp;{error}</p>
				{submitButton && (
					<button className="submit" type="submit" onClick={submitHandler}>
						{submitButton.text}
					</button>
				)}
			</form>
		</div>
	);
};

export default Form;
