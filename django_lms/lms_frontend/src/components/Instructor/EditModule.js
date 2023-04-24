import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';


const baseUrl = 'http://127.0.0.1:8000/api'


function EditModule(){

    const [moduleData, setModuleData] = useState({
        course: '',
        title:'',
        description:'',
        old_video: '', 
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

    const {module_id} = useParams();
   
    const formSubmit =()=>{
        const _formData = new FormData(); 
        _formData.append('course', moduleData.course);
        _formData.append('title', moduleData.title);
        _formData.append('description', moduleData.description);
        if (moduleData.video!==''){
            _formData.append('video', moduleData.video, moduleData.video.name);
        }
        _formData.append('remarks', moduleData.remarks);

        try{
            axios.put(baseUrl+ '/module/' +module_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                },
            })
            .then((response) => {
                 if (response.status==200){
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
        }
   };

   useEffect(() =>{
    document.title = 'Instructor Dashboard | Edit Module'
})

// Fetch the module details when the page is loaded
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/module/'+module_id).then((response) =>
            {
                setModuleData({
                    course: response.data.course,
                    title: response.data.title,
                    description: response.data.description,
                    old_video: response.data.video,
                    remarks: response.data.remarks,
                    video:''

                });
            });
        }
        catch(error){
            console.log(error);
        }
  
    },[]);

    const cardStyle ={
        backgroundColor: "#990000"
    }

    return(
        <div className='container mt-4'>
        <div className='row'>
            <aside className='col-md-3'>
                <InstructorLeftSideBar/>
            </aside>
            <div className='col-9'>
                <div className='card'>
                    <h5 className='card-header text-white' style={cardStyle}>
                       Edit Modules
                    </h5>
                    <div className='card-body'>
                        <form>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="title">Module</label>
                                <input type="text" value={moduleData.title} onChange={handleChange} name='title' id="title" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="description">Module Description</label>
                                <textarea type="text" value={moduleData.description} onChange={handleChange} name='description' id="description" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="video">Lecture</label>
                                <input type="file" onChange={handleFileChange} name='video' id="video" className="form-control form-control-md" />
                                    {moduleData.old_video &&
                                        <video controls width="100%" height="240" className='mt-2' >
                                            <source src={moduleData.old_video}  type="video/mp4"/>
                                        </video>  
                                    }           
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="tech">Requirements</label>
                                <textarea type="text" onChange={handleChange} value={moduleData.remarks} name='remarks' id="text" className="form-control" />
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
    );
}

export default EditModule;