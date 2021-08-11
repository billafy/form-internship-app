import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {FormProvider} from './context/formContext'

import Form from './components/Form'

import PrivateRoute from './components/PrivateRoute'

import UploadProfilePicture from './components/UploadProfilePicture'

import {personalDetailsInput, contactInformationInput} from './utils/utils'

const FormApp = () => {
    return (
        <FormProvider>
            <Router>
                <Switch>
                    <Route path='/personal-details'>
                        <Form 
                            title = 'Personal Details'
                            fields = {personalDetailsInput}
                            submitButton = {{text: 'Next', href: '/contact-information'}}
                        />
                    </Route>
                    <PrivateRoute path='/contact-information' privateStates={personalDetailsInput} redirect='/personal-details'>
                        <Form 
                            title = 'Contact Information'
                            fields = {contactInformationInput}
                            submitButton = {{text: 'Next', href: '/upload-profile-picture'}}
                            link = {{text: 'Back', href: '/personal-details'}}
                        />
                    </PrivateRoute>
                    <PrivateRoute path='/upload-profile-picture' privateStates={contactInformationInput} redirect='/contact-information'>
                        <UploadProfilePicture/>
                    </PrivateRoute>
                </Switch>
            </Router>
        </FormProvider>  
    )
}

export default FormApp
