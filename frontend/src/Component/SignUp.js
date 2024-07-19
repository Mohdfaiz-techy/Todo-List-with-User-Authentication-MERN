import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";
import { showAlertWithTimeout, hideAlert } from "./ReduxToolKit/AlertSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [credentials, setcredentials] = useState({ name:"", email:"", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:5000/user/createUser",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const res = await response.json();
    if (res.success) {
      localStorage.setItem("token", res.token);
      navigate("/login", { state: { signupSuccess: true } });
    } else {
      dispatch(showAlertWithTimeout({ message: 'E-mail already exist', alertType: 'danger' }));
    }
  };

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleHideAlert = () => {
    dispatch(hideAlert());
  };

  return (
    <>
      <Navbar />
      {alert.visible && (
        <div className={`alert alert-${alert.alertType} alert-dismissible`} role="alert">
          <div>{alert.message}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleHideAlert}></button>
        </div>
      )}

      <div className="container text-center">
        <h1 className="my-2">Sign Up to use <strong>TodoList</strong></h1>
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-3 "></div>
            <div className="my-3 col-lg-6 text-start">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter your Name"
                value={credentials.name}
                onChange={onChange}
                autoComplete="off"
              />
            </div>
            <div className="col-lg-3 "></div>
          </div>
          <div className="row">
            <div className="col-lg-3 "></div>
            <div className="my-3 col-lg-6 text-start">
              <label htmlFor="email" className="form-label">Email address</label>
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
              <label htmlFor="password" className="form-label">Password</label>
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
          <button className="btn btn-primary sm-btn text-center" type="submit">Sign Up</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
