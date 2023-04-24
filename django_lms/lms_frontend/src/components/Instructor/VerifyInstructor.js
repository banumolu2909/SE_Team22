import {Link, useParams, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function VerifyInstructor(){

    const navigate = useNavigate()
    const [instructorData, setinstructorData] = useState({
        otp_digit: ''
    })

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (event) => {
        setinstructorData({
            ...instructorData, [event.target.name]: event.target.value
        });
    }
    const {instructor_id} = useParams();
    
   const submitForm = () => {
    const instructorFormData = new FormData();
    instructorFormData.append('otp_digit', instructorData.otp_digit)

    try{
        axios.post(baseUrl+ '/verify-instructor/'+instructor_id + '/',instructorFormData)
        .then((response) => {
            if (response.data.bool === true){
                localStorage.setItem('instructorLoginStatus', true);   //getting the status of login
                localStorage.setItem('instructorId', response.data.instructor_id);  //getting the instructor id and storing after logged in
                // console.log(response.data.instructor_id)
                navigate('/instructor-dashboard');
                //window.location.href = '/instructor-dashboard';
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
        document.title = 'Verify your Account | Instructor'
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
                            Enter 6-digit OTP 
                        </h5>
                        <div className='card-body'>
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">OTP</label>
                                    <input type="number"  onChange={handleChange} name="otp_digit" value={instructorData.otp_digit} 
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

export default VerifyInstructor;