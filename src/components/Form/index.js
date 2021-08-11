import React, {useState, useEffect} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {useForm} from '../../context/formContext'

import './styles.scss'

const Form = ({title, fields, submitButton, link}) => {
	const [inputFields, setInputFields] = useState(fields)
	const [error, setError] = useState('')
	const {formInput, updateInput, validatePersonalDetails, validateField} = useForm()
	const history = useHistory()

	const submitHandler = (event) => {
		event.preventDefault()
		const [valid, err] = validatePersonalDetails()
		if(valid)
			history.push(submitButton.href)
		else
			setError(err)
	}

	const blurHandler = (name) => {
		const [valid, err] = validateField(name)
		if(!valid)
			setInputFields(prev => {
				return prev.map(field => {
					if(field.name === name)
						return {...field, error: err}
					return field	
				})
			})
		else
			setInputFields(prev => {
				return prev.map(field => {
					if(field.name === name)
						return {...field, error: ''}
					return field
				})
			})
	}
	
	const getInputField = (field) => {
		if(field.type === 'select') {
			return (
				<select 
					value={formInput[field.name]} 
					onChange={({target: {value}}) => updateInput(field.name, value)}
					onBlur={() => blurHandler(field.name)}
				>
					{field.options.map(option => <option key={option} value={option}>{option}</option>)}
				</select>	
			)
		}
		else if(field.type === 'textarea') {
			return (
				<textarea
					placeholder={field.text} 
					value={formInput[field.name]} 
					onChange={({target: {value}}) => updateInput(field.name, value)}
					onBlur={() => blurHandler(field.name)}
				/>	
			)
		}
		return (
			<input
				type={field.type} 
				placeholder={field.text} 
				value={formInput[field.name]} 
				onChange={({target: {value}}) => updateInput(field.name, value)}
				onBlur={() => blurHandler(field.name)}
			/>
		)
	}

	useEffect(() => {
		if(!error)
			return
		setTimeout(() => setError(''), 3000)
	}, [error])

    return (
    	<div>
    		{link && <Link to={link.href}>{link.text}</Link>}
    		<h1>{title}</h1>
    		<form>
    			{inputFields && inputFields.map(field => {
					return (
						<div key={field.id}>
							<div></div>
							{getInputField(field)}
							{field.error && <p>{field.error}</p>}
						</div>
					)
    			})}
    			{submitButton && <input type='submit' value={submitButton.text} onClick={submitHandler}/>}
    		</form>
    		{error && <p>{error}</p>}
    	</div>	
	)
}

export default Form