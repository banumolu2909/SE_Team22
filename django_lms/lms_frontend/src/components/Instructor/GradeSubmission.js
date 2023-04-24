import {Link } from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Swal from 'sweetalert2';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

// const student_id = localStorage.getItem('student_id');

function GradeSubmission(){
    const {assignmentResponse_id} = useParams();
    // useEffect(() =>{
    //     try{
    //         axios.get(baseUrl+'/assignmentResponse_id/'+ assignment_id).then((response) =>
    //         {
    //             setAssignmentData(response.data);
    //             setcourseData(response.data.course);
    //         });
    //     }
    //     catch(error){
    //         console.log(error);
    //     }
      
    // },[]);

    const [assignmentResponseData, setassignmentResponseData] = useState({
        // assignment:'',
        // course:'',
        // student:'',
        // reponse_text:'',
        // submission_file:'',
        grade:''
    });


   const handleChange = (event) =>{
    setassignmentResponseData({
            ...assignmentResponseData,
            [event.target.name]: event.target.value
        });
   }
   
   const formSubmit =()=>{
        const _formData = new FormData();
        console.log('grade:', assignmentResponseData.grade);
        _formData.append('grade', assignmentResponseData.grade);
        console.log('form:', _formData);
        try{
        axios({
            method: "put",
            url: baseUrl+ '/assignmentResponse/'+assignmentResponse_id+'/',
            data: _formData,
            // headers: { "Content-Type": "multipart/form-data" },
          })
            .then((response) => {
                if (response.status==200 || response.status==201){
                    Swal.fire({
                        title: 'Assignment has been Graded',
                        toast: true,
                        icon: 'success',
                        position:'top-right',
                        showConfirmButton: false,
                        timer:1000,
                        timerProgressBar:true,
                        showCloseButton: true
                      });
             }
             setTimeout(function() {
                window.location.replace('/instructor-dashboard/');
              }, 1000);
                // console.log(response.data);
                // window.location.href = '/user-dashboard'
            });
    
        }catch(error){
            console.log(error);
        }
        
   };

    useEffect(() =>{
        document.title = 'Instructor Dashboard | Grade Assignment'

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
                            Grade Assignment
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="grade">Assign Grade</label>
                                    <input type="number" onChange={handleChange} name='grade' id="grade" className="form-control form-control-lg" />
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

export default GradeSubmission;