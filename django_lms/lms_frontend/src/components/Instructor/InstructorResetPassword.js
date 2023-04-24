import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorResetPassword(){

    const navigate = useNavigate();
    const [instructorData, setinstructorData] = useState({
        password: '',
    })

    const {instructor_id} = useParams();

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (event) => {
        setinstructorData({
            ...instructorData, [event.target.name]: event.target.value
        });
    }

   const submitForm = () => {
    const instructorFormData = new FormData();
    instructorFormData.append('password', instructorData.password)

    try{
        axios.post(baseUrl+ '/instructor-reset-password/'+instructor_id +'/',instructorFormData)
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

   const instructorLoginStatus = localStorage.getItem('instructorLoginStatus'); 
   
   if (instructorLoginStatus === 'true'){
    window.location.href = 'instructor-dashboard';
   }

    useEffect(() =>{
        document.title = 'Instructor | Reset Password'
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
                            Enter your password
                        </h5>
                        <div className='card-body'>
                            {successMsg && <p className='text-success'>{successMsg}</p>}
                            {errorMsg && <p className='text-danger'>{errorMsg}</p>}
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Password</label>
                                    <input type="password"  onChange={handleChange} name="password" value={instructorData.password} 
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

export default InstructorResetPassword;