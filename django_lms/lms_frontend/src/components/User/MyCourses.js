// import {Link} from 'react-router-dom';
// import LeftSideBar from './LeftSideBar';

// function MyCourses(){
//     return(
//         <div className='container mt-4'>
//             <div className = "row">
//                 <aside>
//                     <LeftSideBar/>
//                 </aside>
//                 <section className='col-md-7'>
//                     <div className = "row">
//                         <div className = "col-md-4 my-2">
//                             <div className="card">
//                                 <Link to = "/detail/1"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></Link>
//                                 <div className="card-body">
//                                 <Link to = "/detail/1"> <h5 className="card-title">Getting started with React JS</h5> </Link>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className = "col-md-4 my-2">
//                             <div className="card">
//                                 <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
//                                 <div className="card-body">
//                                     <a href = "#"> <h5 className="card-title">Introduction to MYSQL</h5> </a>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className = "col-md-4 my-2">
//                             <div className="card">
//                                 <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
//                                 <div className="card-body">
//                                     <a href = "#"> <h5 className="card-title">Django for beginners</h5> </a>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className = "col-md-4 my-2">
//                             <div className="card">
//                                 <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
//                                 <div className="card-body">
//                                     <a href = "#"> <h5 className="card-title">Advanced Python Concepts</h5> </a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//             </div>
//     </div>
        
//     );
// }

// export default MyCourses;

import {Link, useParams} from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function MyCourses(){

    const [courseData, setcourseData] = useState([]);
    const student_id = localStorage.getItem('studentId');

    // Fetching the courses when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/fetch-enrolled-courses/' + student_id).then((response) =>
            {
                setcourseData(response.data);
                console.log(response.data);
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
            <div className = "row">
            <aside className='col-md-3'>
                        <LeftSideBar/>
                    </aside>
                <section className='col-md-9'>
                <div className="card">
                <h5 className='card-header text-white' style={cardStyle}>My Enrolled Courses</h5>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            {/* <th>Course Code</th> */}
                                            <th>Name</th>
                                            <th>Created By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {courseData.map((row, index) => 
                                    <tr>
                                         <td><Link to={`/detail/`+row.course.id}>{row.course.title}</Link></td>
                                         <td><Link to= {`/view-student/` + row.course.instructor.id}>{row.course.instructor.full_name}</Link></td>
                                         <td>
                                            <button className='btn btn-danger btn-sm active'>Un-Enroll</button>
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

export default MyCourses;