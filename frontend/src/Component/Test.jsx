import React from 'react'
  import { showAlert, hideAlert } from '../Component/ReduxToolKit/AlertSlice'
import { useDispatch, useSelector } from 'react-redux'

const Test = () => { 
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);

  const handleShowAlert = () => {
    dispatch(showAlert({ message: 'This is a test alert!', alertType: 'success' }));
  };

  const handleHideAlert = () => {
    dispatch(hideAlert());
  };
  handleShowAlert()
  return (
    <div>
      {/* <button onClick={handleShowAlert}>Show Alert</button> */}
      <button onClick={handleHideAlert}>Hide Alert</button>
      
      {alert.visible && (
        <div className={`alert alert-${alert.alertType} alert-dismissible`} role="alert">
          <div>{alert.message}</div>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleHideAlert}></button>
        </div>
      )}
    </div>
  );}



export default Test
