import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Todo from "./Todo";
import AddTodo from "./AddTodo";
import Navbar from "./Navbar";
import { hideAlert,showAlertWithTimeout } from './ReduxToolKit/AlertSlice';

const Home = () => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login",{ state: { logoutSuccess: true } });
    }
    if (location.state?.loginSuccess)
      // we can Access uselocation state by this method (location.state?.logoutSuccess)
      {
      dispatch(showAlertWithTimeout({ message: 'Login Successfully!', alertType: 'success' }));
    }
  }, [navigate,location.state,dispatch]);

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
      <AddTodo />
      <Todo />
    </>
  );
};

export default Home;
