import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal  from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'


function InstructorChangePassword(){

    const[instructorData, setInstructorData] = useState({
        'password': '',
    });

    const instructorId = localStorage.getItem('instructorId'); 

    const handleChange = (event) => {  
        setInstructorData({               
                ...instructorData,             
                [event.target.name]: event.target.value
        });
        }

        const submitForm =()=> {
            const instructorFormData = new FormData();
            instructorFormData.append('password', instructorData.password)
            
            try{
                axios.post(baseUrl+'/instructor/change-password/'+instructorId + '/', instructorFormData).then((response) => {
                    if (response.status==200 || response.status === 201){
                        Swal.fire({
                            title: 'Your password has been updated',
                            toast: true,
                            icon: 'success',
                            position:'top-right',
                            showConfirmButton: false,
                            timer:3000,
                            timerProgressBar:true,
                            showCloseButton: true
                          });
                 }
                //window.location.href = '/edit-module/1'
            });
            }catch(error){
                console.log(error);
                setInstructorData({'status': 'error'})
            }
        };
        useEffect(() =>{
            document.title = 'Instructor Dashboard | Change Password'
        })

        const cardStyle ={
            backgroundColor: "#990000"
        }

    return (
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <InstructorLeftSideBar/>
            </aside>
            <div className='col-9'>
                <div className='card'>
                    <h5 className='card-header text-white' style={cardStyle}>
                       Update Password
                    </h5>
                    <div className='card-body'>
                        <form>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="description">New Password</label>
                                <input type="text" onChange={handleChange} value={instructorData.password} name='password' id="password" className="form-control" />
                            </div>
                            {/* <div className="mb-4">
                                <label className="form-label" htmlFor="tech">Confirm Password</label>
                                <input type="text"  name='remarks' id="text" className="form-control" />
                            </div> */}
                            <div className="pt-1 mb-4">
                                <button onClick={submitForm} className="btn btn-primary btn-md btn-block" type="button">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

            </div>

        </div>

    </div>
    )
}

export default InstructorChangePassword;

