import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideAlert, showAlertWithTimeout } from "./ReduxToolKit/AlertSlice";

export const Login = () => {
  const dispatch = useDispatch();
  // Define alert variable using useSelector
  const alert = useSelector((state) => state.alert);
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.logoutSuccess)
      // we can Access uselocation state by this method (location.state?.logoutSuccess)
      {
      dispatch(showAlertWithTimeout({ message: 'Logged Out Successfully!', alertType: 'success' }));
      navigate({ ...location, state: undefined }); // Clear location state
    }
    if (location.state?.signupSuccess)
      // we can Access uselocation state by this method (location.state?.logoutSuccess) 
    {
      dispatch(showAlertWithTimeout({ message: 'Sign-Up Successfully!', alertType: 'success' }));
      navigate({ ...location, state: undefined }); // Clear location state
    }
  },  [dispatch,navigate, location]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/user/login",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.token);
      navigate("/home", { state: { loginSuccess: true } });
       {/* in useLocation hook we send state by navigate("/path" , {state:{ logoutSuccess: true}}) or with link by state = {{ logoutSuccess: true }}} */}
      setCredentials({ email: "", password: "" });
    } else {
      dispatch(showAlertWithTimeout({ message: 'Invalid Credentials', alertType: 'danger' }));
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleHideAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      <Navbar />
      {/* Check if alert is defined before accessing its properties */}
       {alert && alert.visible && (
        <div className={`alert alert-${alert.alertType} alert-dismissible`} role="alert">
          <div>{alert.message}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleHideAlert}></button>
        </div>
      )} 
      <div className="container text-center">
        <h1 className="my-2">
          Login to use <strong>TodoList</strong>
        </h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-3 "></div>
            <div className="my-3 col-lg-6 text-start">
              <label htmlFor="email" className="form-label ">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your E-mail"
                value={credentials.email}
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="col-lg-3 "> </div>
          </div>
          <div className="row">
            <div className="col-lg-3 "></div>
            <div className="my-3 col-lg-6 text-start">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                onChange={onChange}
                value={credentials.password}
                autoComplete="off"
              />
            </div>
            <div className="col-lg-3 "></div>
          </div>
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-6 text-start">
              <p>Don't have an Account? <Link id="loginText" to="../signUp">Register</Link></p>
            </div>
          </div>
          <button className="btn btn-primary sm-btn text-center" type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
