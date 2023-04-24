import {Link, useParams} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorAssignments(){

    const [assignmentData, setAssignmentData] = useState([]);
    const instructor_id = localStorage.getItem('instructorId');
    const {course_id} = useParams();
    // Fetching the courses' assignments when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/view-course-assignment/'+instructor_id+'/'+course_id).then((response) =>
            {
                setAssignmentData(response.data.response);
                console.log(response.data.response);
                console.log('This is assignmentData var:')
                
                setTimeout(function() {
                    console.log("Printing : Assignnets ",assignmentData);
                    
                }, 3000); 
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    // console.log(courseData);

    const cardStyle ={
        backgroundColor: "#990000"
    }

    return(
        <div className='container mt-4 col-md-12'>
            <div className = "row">
                <aside>
                {/* <aside className='col-md-2' > */}
                    <InstructorLeftSideBar/>
                </aside>
                <section className='col-md-10'>
                <div className="card">
                <h5 className='card-header text-white' style={cardStyle}>Published Assignments</h5>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            {/* <th>Course Code</th> */}
                                            <th>Title</th>
                                            <th>Creation Date</th>
                                            <th>Deadline</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {assignmentData.map((row, index) => 
                                    <tr>
                                         <td>{row.title}</td>
                                         <td>{row.creation_time}</td>
                                         <td>{row.deadline}</td>
                                         <td>
                                        <Link to={`/view-assignment/` + row.id} className='btn btn-success btn-sm active mx-2'>Edit Assignment</Link>
                                        <Link to={`/view-submission/` + row.id} className='btn btn-success btn-sm active mx-2 '>View Submissions</Link>
                                         </td>
                                    </tr> 
                                    )}
                                    <tr></tr>
                                    </tbody>
                                </table>

                            </div>
                                
                            </div>

                </section>
            </div>
    </div>
        
    );
}

export default InstructorAssignments;