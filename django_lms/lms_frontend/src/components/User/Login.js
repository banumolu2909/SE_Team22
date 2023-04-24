import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function Login(){

    const navigate = useNavigate();

    const [studentLoginData, setstudentLoginData] = useState({
        email: '',
        password: ''
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        setstudentLoginData({
            ...studentLoginData, [event.target.name]: event.target.value
        });
    }

   const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('email', studentLoginData.email)
    studentFormData.append('password', studentLoginData.password)

    try{
        axios.post(baseUrl+ '/user-login',studentFormData)
        .then((response) => {
            if (response.data.bool === true){
                if (response.data.login_via_otp === true){
                    navigate('/verify-student/'+ response.data.student_id);
                }
                else{
                    localStorage.setItem('studentLoginStatus', true);   //getting the status of login
                    localStorage.setItem('studentId', response.data.student_id);  //getting the student id and storing after logged in
                    navigate('/user-dashboard/');
                }
                
            }
            else{
                setErrorMsg(response.data.msg);
            }
        });

    }catch(error){
        console.log(error);
    }
}

   const studentLoginStatus = localStorage.getItem('studentLoginStatus'); 
   
   if (studentLoginStatus === 'true'){
    window.location.href = '/user-dashboard';
   }

    useEffect(() =>{
        document.title = 'Student Login'
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
                    <div className='card mt-5'>
                        <h5 className='card-header text-white text-center' style={cardStyle}>
                            Sign in to your User account
                        </h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email"  onChange={handleChange} name="email" value={studentLoginData.email} 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input type="password" onChange={handleChange} 
                                    value={studentLoginData.password} name="password" 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} className="btn btn-md btn-block text-white" style={LoginText} type="button">Login</button>
                                </div>
                                <Link className="small text-muted mt-3" to="/student-forgot-password">Forgot password?</Link>
                                <p className="mb-5 pb-lg-2" >
                                    Don't have an account? <Link to="/user-register">Register here</Link>
                                </p>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Login;