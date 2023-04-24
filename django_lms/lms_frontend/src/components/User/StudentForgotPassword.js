import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function StudentForgotPassword(){

    const navigate = useNavigate();
    const [studentData, setstudentData] = useState({
        email: '',
    })

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (event) => {
        setstudentData({
            ...studentData, [event.target.name]: event.target.value
        });
    }

   const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('email', studentData.email)

    try{
        axios.post(baseUrl+ '/student-forgot-password/',studentFormData)
        .then((response) => {
            if (response.data.bool === true){
                setSuccessMsg(response.data.msg);
                setErrorMsg("");
            }
            else{
                setErrorMsg(response.data.msg);
                setSuccessMsg("");
            }
        });

    }catch(error){
        console.log(error);
    }
   }

   const studentLoginStatus = localStorage.getItem('studentLoginStatus'); 
   
   if (studentLoginStatus === 'true'){
    window.location.href = 'user-dashboard';
   }

    useEffect(() =>{
        document.title = 'Student | Forgot Password'
    })

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 offset-4'>
                    <div className='card'>
                        <h5 className='card-header text-center'>
                            Enter your registered email address
                        </h5>
                        <div className='card-body'>
                            {successMsg && <p className='text-success'>{successMsg}</p>}
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input type="email"  onChange={handleChange} name="email" value={studentData.email} 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} className="btn btn-dark btn-md btn-block" type="button">Send email</button>
                                </div>
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

export default StudentForgotPassword;