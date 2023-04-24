import {Link } from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

const student_id = localStorage.getItem('studentId')

function SubmitAssignment(){
    const [assignmentData, setAssignmentData] = useState([]);
    const [courseData, setcourseData] = useState([]);
    const {assignment_id} = useParams();
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/assignment/'+ assignment_id).then((response) =>
            {
                setAssignmentData(response.data);
                setcourseData(response.data.course);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    const [assignmentResponsData, setassignmentResponsData] = useState({
        assignment:'',
        course:'',
        student:'',
        reponse_text:'',
        submission_file:''
    });


   const handleChange = (event) =>{
    setassignmentResponsData({
            ...assignmentResponsData,
            [event.target.name]: event.target.value
        });
   }

   const handleFileChange = (event) =>{
    setassignmentResponsData({
            ...assignmentResponsData,
            [event.target.name]:event.target.files[0]
        });
   }
   
   //console.log(assignment_id, student_id);
   
   const formSubmit =()=>{
        const _formData = new FormData();
        _formData.append('assignment', assignment_id);
        _formData.append('course', courseData.id);
        _formData.append('student', student_id);
        _formData.append('reponse_text', assignmentResponsData.reponse_text);
        _formData.append('submission_file', assignmentResponsData.submission_file);
        console.log(_formData)
        try{
            axios.post(baseUrl+ '/assignmentResponse/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                console.log(response.data);
                if (response.status==200 || response.status == 201){
                    Swal.fire({
                        title: 'Assignment has been submitted!',
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
        document.title = 'Student Dashboard | Submit Assignment'

    })

    return (
        <div className='container mt-4'>
            <div className='row'>
                <aside className='col-md-3'>
                    <LeftSideBar/>
                </aside>
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header'>
                            Submit Assignment
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-4">
                                    <b><label className="form-label" htmlFor="title">Submission for {assignmentData.title}</label></b>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="reponse_text" placeholder='Optional Response text for instructor'>Response Text</label>
                                    <textarea type="text" onChange={handleChange} name='reponse_text' id="reponse_text" className="form-control form-control-lg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="submission_file">Submission File</label>
                                    <input type="file" onChange={handleFileChange} name='submission_file' id="submission_file" className="form-control form-control-md" />
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

export default SubmitAssignment;