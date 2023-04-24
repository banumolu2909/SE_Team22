import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'

function ViewEditAssignment(){

    const [dateValue, onChange] = useState(new Date().toISOString());

    const [assignmentData, setassignmentData] = useState({
        title:'',
        description:'',
        old_file:'',
        deadline:'',
        assignment_file:''
    });

    const handleChange = (event) =>{
        setassignmentData({
            ...assignmentData,
            [event.target.name]: event.target.value
        });
   }

   const handleFileChange = (event) =>{
    setassignmentData({
        ...assignmentData,
        [event.target.name]:event.target.files[0]
        });
    }

    const {assignment_id} = useParams();
   
    const formSubmit =()=>{
        const _formData = new FormData(); 
        _formData.append('course', assignmentData.course);
        _formData.append('instructor', assignmentData.instructor);
        _formData.append('title', assignmentData.title);
        _formData.append('description', assignmentData.description);
        if (assignmentData.file!==''){
            _formData.append('file', assignmentData.file, assignmentData.file.name);
        }
        _formData.append('deadline', dateValue);

        try{
            axios.put(baseUrl+ '/assignment/' + assignment_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                },
            })
            .then((response) => {
                 if (response.status==200){
                        Swal.fire({
                            title: 'Assignment has been modified',
                            toast: true,
                            icon: 'success',
                            position:'top-right',
                            showConfirmButton: false,
                            timer:3000,
                            timerProgressBar:true,
                            showCloseButton: true
                          });
                 }
                 setTimeout(function() {
                    window.location.replace('/instructor-dashboard');
                  }, 3000);
                //window.location.href = '/edit-module/1'
            });
        }catch(error){
            console.log(error);
        }
   };

   useEffect(() =>{
    document.title = 'Instructor Dashboard | Edit Assignment'
})

// Fetch the module details when the page is loaded
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/assignment/'+assignment_id).then((response) =>
            {
                setassignmentData({
                    course: response.data.course,
                    instructor: response.data.instructor,
                    title: response.data.title,
                    description: response.data.description,
                    old_file: response.data.file,
                    deadline: response.data.deadline,
                    assignment_file:''

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
                       Edit Assignment
                    </h5>
                    <div className='card-body'>
                        <form>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="title">Assignment</label>
                                <input type="text" value={assignmentData.title} onChange={handleChange} name='title' id="title" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="description">Assignment Description</label>
                                <textarea type="text" value={assignmentData.description} onChange={handleChange} name='description' id="description" className="form-control" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="video">File</label>
                                <input type="file" onChange={handleFileChange} name='file' id="file" className="form-control form-control-md" />
                            </div>
                            <div className="mb-4">
                                <label className="form-label" htmlFor="tech">Deadline</label>
                                <DateTimePicker name='deadline' onChange={onChange} value={dateValue}/>
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

export default ViewEditAssignment;