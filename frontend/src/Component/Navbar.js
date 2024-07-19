import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const token = localStorage.getItem('token')
  const handleOnClick =()=>{
    localStorage.setItem("token",'');;
 
  }
  
  return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-light">
    <div className="container-fluid">
      <a className="navbar-brand" href="/">Navbar</a>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
          </li>
         
        </ul>
        <div className="d-flex" >
       
       {/* <NavigateBtn/> */}
       {(token)?
               <Link className="nav-link btn btn-primary mx-2 px-2 py-1" to="/login" state={{ logoutSuccess: true }} type='button'onClick={handleOnClick}>
                {/* in useLocation hook we send state by navigate(./path , {state:{ logoutSuccess: true}}) or with link by state = {{ logoutSuccess: true }}} */}
               Log-Out
             </Link>:( <>
            <Link className="nav-link btn btn-primary mx-2 px-2 py-1" to="/login" type='button'>
              Login
            </Link>
            <Link className="nav-link btn btn-primary mx-2 px-2 py-1" to="/signUp" type='button'>
              Sign-Up
            </Link>
          </>)
             }
          
        </div>
      </div>
    </div>
  </nav>

    </>
  )
}

export default Navbar
