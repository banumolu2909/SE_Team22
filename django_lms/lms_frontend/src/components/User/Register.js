// import {Link } from 'react-router-dom';

// function Register(){
//     return (
//         <div className='container mt-4'>
//             <div className='row'>
//                 <div className='col-4 offset-4'>
//                     <div className='card'>
//                         <h5 className='card-header text-center'>
//                             Sign up to your account
//                         </h5>
//                         <div className='card-body'>
//                             <form>
//                                 <div className="form-outline mb-4">
//                                     <label className="form-label" for="fullname">Full Name</label>
//                                     <input type="email" id="fullname" className="form-control form-control-lg" />
//                                 </div>
//                                 <div className="form-outline mb-4">
//                                     <label className="form-label" for="email">Email address</label>
//                                     <input type="email" id="email" className="form-control form-control-lg" />
//                                 </div>
//                                 {/* <div className="form-outline mb-4">
//                                     <label className="form-label" for="username">Username</label>
//                                     <input type="email" id="username" className="form-control form-control-lg" />
//                                 </div> */}
//                                 <div className="form-outline mb-4">
//                                     <label className="form-label" for="password">Password</label>
//                                     <input type="password" id="password" className="form-control form-control-lg" />
//                                 </div>
//                                 {/* <div className="form-outline mb-4">
//                                     <label className="form-label" for="cnfpassword">Confirm password</label>
//                                     <input type="password" id="cnfpassword" className="form-control form-control-lg" />
//                                 </div> */}
//                                 <div className="pt-1 mb-4">
//                                     <button className="btn btn-dark btn-lg btn-block" type="button">Sign Up</button>
//                                 </div>
//                             </form>
//                         </div>
//                     </div>

//                 </div>

//             </div>

//         </div>
//     )
// }

// export default Register;

import {Link, useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/student/';


function Register(){

    const navigate = useNavigate();

    //This will make sure the fields is empty by default
    const[studentData, setStudentData] = useState({
        'full_name': '',
        'email': '' ,
        'username': '' ,
        'password': '' , 
        'interested_categories': '',
        'status': '',
        'otp_digit':''
    });

    //To change the value in fields
   const handleChange = (event) => {  
    setStudentData({               //a spread operator used to set the student data using element name of each field 
            ...studentData,              // to the value being passed.
            [event.target.name]: event.target.value
    });
    }

    //Function to submit the form
    const submitForm =()=> {
        const studentFormData = new FormData();
        const otp_digit = Math.floor(100000 + Math.random()*900000);
        studentFormData.append('full_name', studentData.full_name)
        studentFormData.append('email', studentData.email)   
        studentFormData.append('username', studentData.username)   
        studentFormData.append('password', studentData.password)   
        studentFormData.append('interested_categories', studentData.interested_categories) 
        studentFormData.append('otp_digit', otp_digit)           
        
        try{
            axios.post(baseUrl, studentFormData).then((response) =>{
                //console.log("hi")
                navigate('/verify-student/'+ response.data.id);
                // setStudentData({
                //     'full_name': '',
                //     'email': '' ,
                //     'username': '' ,
                //     'password': '' , 
                //     'interested_categories': '',
                //     'status': 'success'
                // });
            });
        }catch(error){
            console.log(error);
            setStudentData({'status': 'error'})
        }
    };

    useEffect(() => {                           
        document.title = 'Student Sign up';      //an effect hook
    });

    const cardStyle ={
        backgroundColor: "#990000"
    }

    const LoginText = {
        backgroundColor: "#990000"
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 offset-4'>
                {studentData.status === 'success' && <p className='text-success'>
                    Thank you for registering with Crimson Board!
                </p>}
                {studentData.status === 'error' && <p className='text-danger'>
                    "Oops! Something unexpected occurred!"
                </p>}
                    <div className='card'>
                        <h5 className='card-header text-center text-white' style={cardStyle}>
                            Sign up to your account
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="fullname">Full Name</label>
                                    <input value={studentData.full_name} onChange ={handleChange} 
                                    name = 'full_name'  type="text" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email Address</label>
                                    <input onChange ={handleChange} value={studentData.email}
                                    name='email' type="email" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="username">Username</label>
                                    <input onChange ={handleChange} value={studentData.username} 
                                     name='username' type="text" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input onChange ={handleChange} value={studentData.password} name='password' type="password" 
                                    autoComplete = 'on' className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="interested_categories">Interests</label>
                                    <input onChange ={handleChange} value={studentData.interested_categories}
                                    name='interested_categories' type="text" className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} type='button' className="btn btn-lg btn-block text-white" style={LoginText}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Register;
