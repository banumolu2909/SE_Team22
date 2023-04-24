import {Link, useNavigate} from 'react-router-dom';
import { useEffect,useState } from 'react';
import axios from 'axios';



const baseUrl = 'http://127.0.0.1:8000/api/instructor/';

function InstructorRegister(){
    const navigate = useNavigate();
    //This will make sure the fields is empty by default
    const[instructorData, setInstructorData] = useState({
        'full_name': '',
        'email': '' ,
        'qualification': '' ,
        'mobile_number': '' ,
        'password': '' , 
        'status': '',
        'otp_digit': ''

    });

    //To change the value in fields
   const handleChange = (event) => {  
    setInstructorData({               //a spread operator used to set the instructor data using element name of each field 
            ...instructorData,              // to the value being passed.
            [event.target.name]: event.target.value
    });
    }

    //Function to submit the form - it creates a form data object whenever the form is submitted. 
    const submitForm =()=> {
        const otp_digit = Math.floor(100000 + Math.random()*900000);
        const instructorFormData = new FormData();
        instructorFormData.append('full_name', instructorData.full_name)
        instructorFormData.append('email', instructorData.email)   
        instructorFormData.append('qualification', instructorData.qualification)   
        instructorFormData.append('mobile_number', instructorData.mobile_number)   
        instructorFormData.append('password', instructorData.password)     
        instructorFormData.append('otp_digit', otp_digit)      
        
        try{
            axios.post(baseUrl, instructorFormData).then((response) =>{
                console.log(response.data);
                navigate('/verify-instructor/'+ response.data.id);
               // window.location.href = '/verify-instructor/'+ response.data.id;
                // setInstructorData({
                //     'full_name': '',
                //     'email': '' ,
                //     'qualification': '' ,
                //     'mobile_number': '' ,
                //     'password': '' , 
                //     'status': 'success'
                // });
            });
        }catch(error){
            console.log(error);
            setInstructorData({'status': 'error'})
        }
       

    };

    // const instructorLoginStatus = localStorage.getItem('instructorLoginStatus'); 
    // console.log(instructorLoginStatus)
    // if (instructorLoginStatus === true){
    //  window.location.href = '/verify-instructor/'
    // }

    useEffect(() => {                           
        document.title = 'Sign up | Instructor';      //an effect hook
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
                {instructorData.status === 'success' &&  <p className='text-success'>
                    Thank you for registering with Crimson Board!
                </p>} 
                {instructorData.status === 'error' && <p className='text-danger'>
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
                                    <input value={instructorData.full_name} onChange ={handleChange} 
                                    name = 'full_name'  type="text" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input onChange ={handleChange} value={instructorData.email}
                                    name='email' type="email" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="qual">Qualification</label>
                                    <input onChange ={handleChange} value={instructorData.qualification} 
                                     name='qualification' type="text" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="num">Mobile Number</label>
                                    <input onChange ={handleChange} value={instructorData.mobile_number}
                                    name='mobile_number' type="tel" className="form-control form-control-lg" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input onChange ={handleChange} value={instructorData.password} name='password' type="password" 
                                    autoComplete = 'on' className="form-control form-control-lg" />
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

export default InstructorRegister;