import React, { useState, useEffect } from "react";

import { Route, Redirect } from "react-router-dom";

import { useForm } from "../../context/formContext";

const PrivateRoute = ({
  path,
  privateStates,
  currentStates,
  redirect,
  children,
}) => {
  const [render, setRender] = useState(true);
  const { setLoading, formInput } = useForm();

  useEffect(() => {
    setLoading(true);
    privateStates.forEach((privateState) => {
      if (!formInput[privateState.name]) {
        setRender(false);
        return;
      }
    });
    setLoading(false);
  }, []);

  if (!render) return <Redirect to={redirect} />;
  return <Route path={path}>{children}</Route>;
};

export default PrivateRoute;
