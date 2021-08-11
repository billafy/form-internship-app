export const defaultInput = {
	firstName: '',
	lastName: '',
	dateOfBirth: '',
	gender: 'Male',
	address: '',
	contactNumber: '',
	email: '',
	profilePicture: '',
}

export const personalDetailsInput = [
	{
		id: 1,
		text: 'First Name',
		type: 'text',
		name: 'firstName'
	},
	{
		id: 2,
		text: 'Last Name',
		type: 'text',
		name: 'lastName'
	},
	{
		id: 3,
		text: 'Date of Birth',
		type: 'date',
		name: 'dateOfBirth'
	},
	{
		id: 4,
		text: 'Gender',
		type: 'select',
		options: ['Male', 'Female', 'Other'],
		name: 'gender',
	}
]

export const contactInformationInput = [
	{
		id: 1,
		text: 'Address',
		type: 'textarea',
		name: 'address'
	},
	{
		id: 2,
		text: 'Contact Number',
		type: 'tel',
		name: 'contactNumber'
	},
	{
		id: 3,
		text: 'Email',
		type: 'text',
		name: 'email'
	},
]
