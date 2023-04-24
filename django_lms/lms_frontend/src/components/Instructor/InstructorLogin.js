import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorLogin(){

    const navigate = useNavigate();
    const [instructorLoginData, setinstructorLoginData] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        setinstructorLoginData({
            ...instructorLoginData, [event.target.name]: event.target.value
        });
    }

   const submitForm = () => {
    const instructorFormData = new FormData();
    instructorFormData.append('email', instructorLoginData.email)
    instructorFormData.append('password', instructorLoginData.password)

    try{
        axios.post(baseUrl+ '/instructor-login',instructorFormData)
        .then((response) => {
            if (response.data.bool === true){
                if (response.data.login_via_otp === true){
                    navigate('/verify-instructor/'+ response.data.instructor_id);
                }
                else{
                    localStorage.setItem('instructorLoginStatus', true);   //getting the status of login
                    localStorage.setItem('instructorId', response.data.instructor_id);  //getting the instructor id and storing after logged in
                    navigate('/instructor-dashboard/');
                }

                
                // // console.log(response.data.instructor_id)
                // window.location.href = 'instructor-dashboard';
                
            }
            else{
                setErrorMsg(response.data.msg);
            }
        });

    }catch(error){
        console.log(error);
    }
   }

   const instructorLoginStatus = localStorage.getItem('instructorLoginStatus'); 
   
   if (instructorLoginStatus === 'true'){
    window.location.href = 'instructor-dashboard';
   }

    useEffect(() =>{
        document.title = 'Instructor Login'
    })

    const cardStyle ={
        backgroundColor: "#990000"
    }

    const LoginText = {
        backgroundColor: "#990000"
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 mt-5 offset-4'>
                    <div className='card'>
                        <h5 className='card-header text-center text-white' style={cardStyle}>
                            Sign in to your Instructor account
                        </h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email"  onChange={handleChange} name="email" value={instructorLoginData.email} 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" onChange={handleChange} 
                                    value={instructorLoginData.password} name="password" 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} className="btn btn-md btn-block text-white" type="button" style={LoginText}>Login</button>
                                </div>
                                <Link className="small text-muted mt-3" to="/instructor-forgot-password">Forgot password?</Link>
                                <p className="mb-5 pb-lg-2" >
                                    Don't have an account? <Link to="/instructor-register">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default InstructorLogin;