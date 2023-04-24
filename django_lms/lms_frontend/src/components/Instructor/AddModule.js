import {Link } from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'


function AddModule(){

    const [moduleData, setModuleData] = useState({
        title:'',
        description:'',
        video:'',
        remarks:''
    });


   const handleChange = (event) =>{
        setModuleData({
            ...moduleData,
            [event.target.name]: event.target.value
        });
   }

   const handleFileChange = (event) =>{
        setModuleData({
            ...moduleData,
            [event.target.name]:event.target.files[0]
        });
   }
   const {course_id} = useParams();
   
   const formSubmit =()=>{
        const _formData = new FormData();
        
         _formData.append('course', course_id);
        _formData.append('title', moduleData.title);
        _formData.append('description', moduleData.description);
        _formData.append('video', moduleData.video, moduleData.video.name);
        _formData.append('remarks', moduleData.remarks);

        try{
            axios.post(baseUrl+ '/module/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                // console.log(response.data);
                //window.location.href = '/add-module/1'
                if (response.status==200 || response.status == 201){
                    Swal.fire({
                        title: 'Data has been added',
                        toast: true,
                        icon: 'success',
                        position:'top-right',
                        showConfirmButton: false,
                        timer:3000,
                        timerProgressBar:true,
                        showCloseButton: true
                      });
                    //   window.location.reload()
             }

            });
    
        }catch(error){
            console.log(error);
        }
   };

    useEffect(() =>{
        document.title = 'Instructor Dashboard | Add Module'
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
                            Add Module
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="title">Module</label>
                                    <input type="text" onChange={handleChange} name='title' id="title" className="form-control form-control-lg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="description">Module Description</label>
                                    <textarea type="text" onChange={handleChange} name='description' id="description" className="form-control form-control-lg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="video">Module video</label>
                                    <input type="file" onChange={handleFileChange} name='video' id="video" className="form-control form-control-md" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="tech">Requirements</label>
                                    <textarea type="text" onChange={handleChange} name='remarks' id="text" className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button onClick={formSubmit} className="btn btn-primary btn-md btn-block" type="button">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddModule;