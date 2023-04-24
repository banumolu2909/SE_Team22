import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function StudentResetPassword(){

    const navigate = useNavigate();
    const [studentData, setstudentData] = useState({
        password: '',
    })

    const {student_id} = useParams();

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (event) => {
        setstudentData({
            ...studentData, [event.target.name]: event.target.value
        });
    }

   const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('password', studentData.password)

    try{
        axios.post(baseUrl+ '/student-reset-password/'+student_id +'/',studentFormData)
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
        document.title = 'Student | Reset Password'
    })

    const cardStyle ={
        backgroundColor: "#990000"
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 offset-4'>
                    <div className='card'>
                        <h5 className='card-header text-white text-center' style={cardStyle}>
                            Enter your password
                        </h5>
                        <div className='card-body'>
                            {successMsg && <p className='text-success'>{successMsg}</p>}
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Password</label>
                                    <input type="password"  onChange={handleChange} name="password" value={studentData.password} 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} className="btn btn-dark btn-md btn-block" type="button">Reset Password</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default StudentResetPassword;