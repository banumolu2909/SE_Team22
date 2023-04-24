import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function VerifyStudent(){

    const navigate = useNavigate()
    const [studentData, setStudentData] = useState({
        otp_digit: ''
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        setStudentData({
            ...studentData, [event.target.name]: event.target.value
        });
    }
    const {student_id} = useParams();
    
   const submitForm = () => {
    const studentFormData = new FormData();
    studentFormData.append('otp_digit', studentData.otp_digit)

    try{
        axios.post(baseUrl+ '/verify-student/'+student_id + '/',studentFormData)
        .then((response) => {
            if (response.data.bool === true){
                localStorage.setItem('studentLoginStatus', true);   //getting the status of login
                localStorage.setItem('studentId', response.data.student_id);  //getting the student id and storing after logged in
                // console.log(response.data.student_id)
                navigate('/user-dashboard');
                //window.location.href = '/student-dashboard';
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
    window.location.href = 'student-dashboard';
   }

    useEffect(() =>{
        document.title = 'Verify your Account | student'
    })

    const cardStyle ={
        backgroundColor: "#990000"
    }

    return (
        <div className='container mt-4'>
            <div className='row'>
                <div className='col-4 offset-4'>
                    <div className='card'>
                        <h5 className='card-header text-center text-white' style={cardStyle}>
                            Enter 6-digit OTP 
                        </h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">OTP</label>
                                    <input type="number"  onChange={handleChange} name="otp_digit" value={studentData.otp_digit} 
                                    className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} className="btn btn-dark btn-lg btn-block" type="button">Verify</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default VerifyStudent;