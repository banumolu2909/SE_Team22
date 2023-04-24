// import {Link } from 'react-router-dom';

// function Header() {

//     const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
//     return (
//       <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
//           <div className="container">
//               <Link className="navbar-brand" to="/">Crimson Board</Link>
//               <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//               <span className="navbar-toggler-icon"></span>
//               </button>
//               <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//               <div className="navbar-nav ms-auto">
//                   <Link className="nav-link active" aria-current="page" to="/">Home</Link>
//                   <Link className="nav-link" to="/all-courses">Courses</Link>

//                   <li className="nav-item dropdown">
//                     <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                       Instructor
//                     </Link>
//                     <ul className="dropdown-menu">
//                     {instructorLoginStatus!== 'true' && <> {/* in order to not show login and register when logged in*/}
//                       <li><Link className="dropdown-item" to="instructor-login">Login</Link></li>
//                       <li><Link className="dropdown-item" to="instructor-register">Register</Link></li>
//                       </>   
//                     }
//                       <li><Link className="dropdown-item" to="instructor-dashboard">Dashboard</Link></li>
//                       <li><a className="dropdown-item" href="instructor-logout">Logout</a></li>
//                     </ul>
//                   </li>
//                   <li className="nav-item dropdown">
//                     <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
//                       Student
//                     </a>
//                     <ul className="dropdown-menu">
//                       <li><Link className="dropdown-item" to="user-login">Login</Link></li>
//                       <li><Link className="dropdown-item" to="user-register">Register</Link></li>
//                       <li><hr className="dropdown-divider"/></li>
//                       <li><Link className="dropdown-item" to="user-dashboard">Dashboard</Link></li>
//                       <li><a className="dropdown-item" href="user-logout">Logout</a></li>
//                     </ul>
//                   </li>
//                   {/* <Link className="nav-link" to="/about">About Us</Link> */}
//               </div>
//               </div>
//           </div>
//   </nav>
//     );
//   }
  
//   export default Header ;
import {Link } from 'react-router-dom';
import {useState, useEffect} from 'react';
import myLogo from '../icons8-student-center-30.png';

function Header() {
    const [searchString, setsearchString] = useState({
      'search':''});
    const instructorLoginStatus = localStorage.getItem('instructorLoginStatus');
    const studentLoginStatus = localStorage.getItem('studentLoginStatus');
    const handleChange=(event)=>{
      setsearchString({
        ...searchString,
        [event.target.name]:event.target.value
      });
    }
    const searchCourse = () =>{
      window.location.href='/search/'+searchString.search
    }

    const nav = {
      color: "#990000",
    }

    const searchbg = {
      backgroundColor:  "#990000",
      color: "white"
    }

    return (
      <nav className="navbar navbar-expand-lg">
          <div className="container">
          <img src={myLogo} to="/" alt="Logo" width="30" height="30" className="align-text-top mx-1" />
              <Link className="navbar-brand mt-1" to="/" style={nav}>
              <b>Crimson Board</b>
              </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
              </button>
              <form className="d-flex">
                <input name="search" onChange={handleChange} className="form=control me-2 mt-2" type="search" placeholder="Search by Course Title" aria-aria-label='Search' />
                
                <button onClick={searchCourse} className="btn mt-2" style={searchbg} type="button"><i class="bi bi-search"></i></button>
              </form>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav ms-auto mt-2">
                  <Link className="nav-link active" aria-current="page" to="/" style={nav}>Home</Link>
                  <Link className="nav-link" to="/all-courses" style={nav}>Courses</Link>

                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="/" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={nav}>
                      Instructor
                    </Link>
                    <ul className="dropdown-menu">
                    {instructorLoginStatus !== 'true' && <> {/* in order to not show login and register when logged in*/}
                      <li><Link className="dropdown-item" to="instructor-login">Login</Link></li>
                      <li><Link className="dropdown-item" to="instructor-register">Register</Link></li>
                      </>   
                    }
                    {
                      instructorLoginStatus === 'true' && <>
                      <li><Link className="dropdown-item" to="instructor-dashboard">Dashboard</Link></li>
                      <li><a className="dropdown-item" href="instructor-logout">Logout</a></li>
                      </>
                    }
                      
                      
                    </ul>
                  </li>
                  <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={nav}>
                      Student
                    </Link>
                    <ul className="dropdown-menu">
                    {studentLoginStatus !== 'true' && <> {/* in order to not show login and register when logged in*/}
                      <li><Link className="dropdown-item" to="user-login">Login</Link></li>
                      <li><Link className="dropdown-item" to="user-register">Register</Link></li>
                      </>   
                    }
                    {
                      studentLoginStatus === 'true' && <>
                      {/* <li><hr className="dropdown-divider"/></li> */}
                      <li><Link className="dropdown-item" to="user-dashboard">Dashboard</Link></li>
                      <li><a className="dropdown-item" href="user-logout">Logout</a></li>
                      </>
                    }
                    </ul>
                    

                  </li>
                  {/* <Link className="nav-link" to="/about">About Us</Link> */}
              </div>
              </div>
          </div>
  </nav>
    );
  }
  
  export default Header ;
  
  