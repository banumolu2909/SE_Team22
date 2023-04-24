
import {Link } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal  from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'

function Account(){

    const[studentData, setstudentData] = useState({
        'full_name': '',
        'email': '' ,
        'interested_categories': '',
        'profile_image': '',
        'p_image': '',
        'password': '',
        'status': '',
        'login_via_otp': ''

    });

    const studentId = localStorage.getItem('studentId'); 
    // To fetch the categories when the page is loaded. 
    useEffect(() => {
        //To fetch the current student data when the page is loaded.
        try{
            axios.get(baseUrl+'/student/'+studentId).then((response) =>
            {
                setstudentData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    profile_image: response.data.profile_image,
                    interested_categories: response.data.interested_categories,
                    password: response.data.password,
                    p_image:'',
                    login_via_otp: response.data.login_via_otp
                });
            });
        }
        catch(error){
            console.log(error);
        }

    },[]);

    const handleChange = (event) => {  
        setstudentData({               
                ...studentData,             
                [event.target.name]: event.target.value
        });
        }

    const submitForm =()=> {
        const studentFormData = new FormData();
        studentFormData.append('full_name', studentData.full_name)
        studentFormData.append('email', studentData.email) 
        studentFormData.append('interested_categories', studentData.interested_categories)   
        studentFormData.append('login_via_otp', studentData.login_via_otp) 
        studentFormData.append('password', studentData.password)   

        if (studentData.p_image!==''){
            studentFormData.append('profile_image', studentData.p_image, studentData.p_image);
        } 
        
        try{
            axios.put(baseUrl+'/student/'+studentId + '/', studentFormData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((response) => {
                // setInstructorData({
                //     'full_name': '',
                //     'email': '' ,
                //     'qualification': '' ,
                //     'mobile_number': '' ,
                //     'profile_image': '',
                //     'p_image':'',
                //     'status': 'success'
                // });
                if (response.status==200 || response.status === 201){
                    Swal.fire({
                        title: 'Data has been modified',
                        toast: true,
                        icon: 'success',
                        position:'top-right',
                        showConfirmButton: false,
                        timer:3000,
                        timerProgressBar:true,
                        showCloseButton: true
                      });
             }
        });
        }catch(error){
            console.log(error);
            setstudentData({'status': 'error'})
        }
    };
    useEffect(() =>{
        document.title = 'Student Dashboard | My Profile'
    })

    const studentLoginStatus = localStorage.getItem('studentLoginStatus'); 
    if (studentLoginStatus !== 'true'){
        window.location.href = '/user-login';
    }

   const handleFileChange = (event) =>{
        setstudentData({
            ...studentData,
            [event.target.name]:event.target.files[0]
        });
   }
   const cardStyle ={
    backgroundColor: "#990000"
}


    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <LeftSideBar/>
                </aside>
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header text-white' style={cardStyle}>
                            My Profile
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="full_name">Full Name</label>
                                    <input value={studentData.full_name} onChange ={handleChange} 
                                    name = 'full_name'  type="text" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input onChange ={handleChange} value={studentData.email}
                                    name='email' type="email" className="form-control form-control-md" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="p_image">Profile Image</label>
                                    <input type="file" onChange={handleFileChange} name="p_image" id='p_image' className="form-control" />
                                    {studentData.profile_image &&
                                       <p><img src={studentData.profile_image} className='rounded' width="300" alt={studentData.full_name}/></p> 
                                    }  
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="interested_categories">interested Courses</label>
                                    <input onChange ={handleChange} value={studentData.interested_categories}
                                    name='interested_categories' type="text" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="password">Password</label>
                                    <input value={studentData.password}
                                    name='email' type="email" className="form-control form-control-md readOnly"readOnly/>
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="login_via_otp">Two Factor Authentication</label>
                                    <input onChange ={handleChange} value={studentData.login_via_otp}
                                    name='login_via_otp' className="form-control form-control-md" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={submitForm} type='button' className="btn btn-info btn-md btn-block" >Save changes</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Account;