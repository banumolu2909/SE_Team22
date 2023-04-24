import {Link } from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal  from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorAccount(){

    const[instructorData, setInstructorData] = useState({
        'full_name': '',
        'email': '' ,
        'bio': '',
        'qualification': '' ,
        'mobile_number': '' ,
        'profile_image': '',
        'p_image': '',
        'status': '',
        'login_via_otp': ''

    });

    const instructorId = localStorage.getItem('instructorId'); 
    // To fetch the categories when the page is loaded. 
    useEffect(() => {
        //To fetch the current instructor data when the page is loaded.
        try{
            axios.get(baseUrl+'/instructor/'+instructorId).then((response) =>
            {
                setInstructorData({
                    full_name: response.data.full_name,
                    email: response.data.email,
                    bio: response.data.bio,
                    qualification: response.data.qualification,
                    mobile_number: response.data.mobile_number,
                    profile_image: response.data.profile_image,
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
        setInstructorData({               
                ...instructorData,             
                [event.target.name]: event.target.value
        });
        }

    const submitForm =()=> {
        const instructorFormData = new FormData();
        instructorFormData.append('full_name', instructorData.full_name)
        instructorFormData.append('email', instructorData.email) 
        instructorFormData.append('bio', instructorData.bio)     
        instructorFormData.append('qualification', instructorData.qualification)   
        instructorFormData.append('mobile_number', instructorData.mobile_number)  
        instructorFormData.append('login_via_otp', instructorData.login_via_otp)  
        if (instructorData.p_image!==''){
            instructorFormData.append('profile_image', instructorData.p_image, instructorData.p_image);
        } 
        
        try{
            axios.put(baseUrl+'/instructor/'+instructorId + '/', instructorFormData,{
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
            //window.location.href = '/edit-module/1'
        });
        }catch(error){
            console.log(error);
            setInstructorData({'status': 'error'})
        }
    };
    useEffect(() =>{
        document.title = 'Instructor Dashboard | My Profile'
    })

    const instructorLoginStatus = localStorage.getItem('instructorLoginStatus'); 
    if (instructorLoginStatus !== 'true'){
        window.location.href = '/instructor-login';
    }

   const handleFileChange = (event) =>{
        setInstructorData({
            ...instructorData,
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
                    <InstructorLeftSideBar/>
                </aside>
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header text-white' style={cardStyle}>
                            My Profile
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="fullname">Full Name</label>
                                    <input value={instructorData.full_name} onChange ={handleChange} 
                                    name = 'full_name'  type="text" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Email address</label>
                                    <input onChange ={handleChange} value={instructorData.email}
                                    name='email' type="email" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="bio">Bio</label>
                                    <textarea onChange ={handleChange} value={instructorData.bio}
                                    name='bio' type="bio" className="form-control form-control-md" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="p_image">Profile Image</label>
                                    <input type="file" onChange={handleFileChange} name="p_image" className="form-control" />
                                    {instructorData.profile_image &&
                                       <p><img src={instructorData.profile_image} className='rounded' width="300" alt={instructorData.full_name}/></p> 
                                    }  
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="qual">Qualification</label>
                                    <input onChange ={handleChange} value={instructorData.qualification} 
                                     name='qualification' type="text" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="num">Mobile Number</label>
                                    <input onChange ={handleChange} value={instructorData.mobile_number}
                                    name='mobile_number' type="tel" className="form-control form-control-md" />
                                </div>
                                <div className="form-outline mb-4">
                                    <label className="form-label" htmlFor="email">Two Factor Authentication</label>
                                    <input onChange ={handleChange} value={instructorData.login_via_otp}
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

export default InstructorAccount;