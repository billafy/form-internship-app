import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { FormProvider } from "./context/formContext";

import Form from "./components/Form";

import Profile from "./components/Profile";

import PrivateRoute from "./components/PrivateRoute";

import UploadProfilePicture from "./components/UploadProfilePicture";

import { personalDetailsInput, contactInformationInput } from "./utils/utils";

import "./global-styles/global.scss";

import { FaArrowRight } from "react-icons/fa";

const FormApp = () => {
  return (
    <div>
      <FormProvider>
        <Router>
          <Switch>
            <Route path="/personal-details">
              <Form
                title="Personal Details"
                fields={personalDetailsInput}
                submitButton={{
                  text: <FaArrowRight />,
                  href: "/contact-information",
                }}
                validator="validatePersonalDetails"
              />
            </Route>
            <PrivateRoute
              path="/contact-information"
              privateStates={personalDetailsInput}
              redirect="/personal-details"
            >
              <Form
                title="Contact Information"
                fields={contactInformationInput}
                submitButton={{
                  text: <FaArrowRight />,
                  href: "/upload-profile-picture",
                }}
                link={{ text: "Back", href: "/personal-details" }}
                validator="validateContactInformation"
              />
            </PrivateRoute>
            <PrivateRoute
              path="/upload-profile-picture"
              privateStates={contactInformationInput}
              redirect="/contact-information"
            >
              <UploadProfilePicture />
            </PrivateRoute>
            <PrivateRoute
              exact
              path="/"
              privateStates={contactInformationInput}
              redirect="/contact-information"
            >
              <Profile />
            </PrivateRoute>
          </Switch>
        </Router>
      </FormProvider>
    </div>
  );
};

export default FormApp;
