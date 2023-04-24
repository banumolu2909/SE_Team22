import {Link, useParams} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function ViewSubmission(){

    const [assignmentData, setassignmentData] = useState([]);
    const [assignmentResponseData, setassignmentResponseData] = useState([]);
    const instructorId = localStorage.getItem('instructorId'); 
    
    const {assignment_id} = useParams();
    console.log(assignment_id);
    // Fetching the courses when the page loads 
    useEffect(() =>{
        // try{
        //     axios.get(baseUrl+'/assignmentResponse/'+ assignment_id).then((response) =>
        //     {
        //         setassignmentResponseData(response.data);
        //     });
        // }
        // catch(error){
        //     console.log(error);
        // }
        try{
            axios.get(baseUrl+'/assignment/'+ assignment_id).then((response) =>
            {
                setassignmentData(response.data);
                // setassignmentResponseData(response.data.assignmentSubmissions);
                // console.log(response.data.instructor);
                // console.log(response.data.course);
                // console.log(response.data.assignmentSubmissions);
                setassignmentResponseData(response.data.assignmentSubmissions);
                console.log(assignmentResponseData);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    // console.log(courseData);

    

    return(
        
        <div className='container mt-4 col-md-12'>
            <div className = "row">
                <aside className='col-md-2' >
                    <InstructorLeftSideBar/>
                </aside>
                <section className='col-md-10'>
                <div className="card">
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            {/* <th>Course Code</th> */}
                                            {console.log(assignmentData.assignmentSubmissions)}
                                            <th>Assignment Title</th>
                                            <th>Student Name</th>
                                            <th>Submission DateTime</th>
                                            <th>Response Text</th>
                                            <th>View Submission File</th>
                                            <th>Grade   </th>
                                            <th>Check Submission</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {assignmentResponseData.map((row, index) => 
                                    <tr>
                                         <td><Link to= {`/view-assignment/`+assignmentData.id}>{assignmentData.title}</Link></td>
                                         
                                         <td><Link to= {`/student/`+row.student.id}>{row.student.full_name}</Link></td>
                                         <td>{row.submission_time}</td>
                                         <td>{row.reponse_text}</td>
                                         {/* <td>{row.submission_file}</td> */}
                                         <td><Link to="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" target="_blank" download={row.title}>Submission File<i class="bi bi-download"></i></Link></td>
                                         <td>{row.grade}</td> 
                                        <td>

                                            <Link to={`/grade-assignment/`+row.id} data-toggle="tooltip" data-placement="top" title="Grade Submission" className='btn btn-info btn-sm ms-2'>
                                            <i class="bi bi-pen-fill"></i>
                                            </Link>
                                        </td>
                                    </tr> 
                                    )}
                                    </tbody>
                                </table>

                            </div>
                                
                            </div>

                </section>
            </div>
    </div>
        
    );
}

export default ViewSubmission;