// import {Link} from 'react-router-dom';
// import InstructorLeftSideBar from './InstructorLeftSideBar';
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const baseUrl = 'http://127.0.0.1:8000/api'

// function InstructorMyCourses(){

//     const [courseData, setcourseData] = useState([]);

//     const instructorId = localStorage.getItem('instructorId'); 
//     console.log(instructorId);

//     // Fetching the courses when the page loads 
//     useEffect(() =>{
//         try{
//             axios.get(baseUrl+'/instructor-courses/'+ instructorId).then((response) =>
//             {
//                 setcourseData(response.data);
//             });
//         }
//         catch(error){
//             console.log(error);
//         }
      
//     },[]);

//     // console.log(courseData);

//     return(
//         <div className='container mt-4 col-md-12'>
//             <div className = "row">
//                 <aside className='col-md-2' >
//                     <InstructorLeftSideBar/>
//                 </aside>
//                 <section className='col-md-10'>
//                 <div className="card">
//                             <div className='card-body'>
//                                 <table className='table table-bordered'>
//                                     <thead>
//                                         <tr>
//                                             {/* <th>Course Code</th> */}
//                                             <th>Course Icon</th>
//                                             <th>Course Name</th>
//                                             <th>Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                     {courseData.map((course,index) => 
//                                     <tr>
//                                          <td><img src={course.course_image} width={80} className='rounded' alt={course.title} /></td>
//                                          <td><Link to= {'/all-modules/' +course.id}>{course.title}</Link></td>
//                                         <td> 
//                                             <Link to={'/edit-course/'+course.id} data-toggle="tooltip" data-placement="top" title="Edit course" className='btn btn-info text-white btn-sm ms-2'>
//                                                 <i className="bi bi-pencil-square"></i>
//                                             </Link>
//                                             <Link to={'/add-module/'+course.id} data-toggle="tooltip" data-placement="top" title="Add module" className='btn btn-success btn-sm ms-2'>
//                                                 <i class="bi bi-folder-plus"></i>
//                                             </Link>
//                                             <button className='btn btn-danger btn-sm ms-2' data-toggle="tooltip" data-placement="top" title="Delete">  
//                                                 <i className="bi bi-trash3"></i> 
//                                             </button>
//                                         </td>
//                                     </tr> 
//                                     )}
//                                     </tbody>
//                                 </table>

//                             </div>
                                
//                             </div>

//                 </section>
//             </div>
//     </div>
        
//     );
// }

// export default InstructorMyCourses;

import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorMyCourses(){

    const [courseData, setcourseData] = useState([]);

    const instructorId = localStorage.getItem('instructorId'); 
    console.log(instructorId);

    // Fetching the courses when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/instructor-courses/'+ instructorId).then((response) =>
            {
                setcourseData(response.data);
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
                                            <th>Course Icon</th>
                                            <th>Total Enrolled</th>
                                            <th>Course Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {courseData.map((course,index) => 
                                    <tr>
                                         <td><img src={course.course_image} width={80} className='rounded' alt={course.title} /></td>
                                         <td><Link to= {`/enrolled-students/` +course.id}>{course.total_enrolled_students}</Link></td>
                                         
                                         <td><Link to= {`/all-modules/` +course.id}>{course.title}</Link></td>
                                        <td> 
                                            <Link to={`/edit-course/`+course.id} data-toggle="tooltip" data-placement="top" title="Edit course" className='btn btn-info text-white btn-sm ms-2'>
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <Link to={`/add-module/`+course.id} data-toggle="tooltip" data-placement="top" title="Add module" className='btn btn-success btn-sm ms-2'>
                                                <i class="bi bi-folder-plus"></i>
                                            </Link>
                                            <Link to={`/add-assignment/`+course.id} data-toggle="tooltip" data-placement="top" title="Add Assignment" className='btn btn-warning btn-sm ms-2'>
                                            <i class="bi bi-file-earmark-plus"></i>
                                            </Link>
                                            <Link to={`/view-assignments/`+course.id} data-toggle="tooltip" data-placement="top" title="View Assignment(s)" className='btn btn-info btn-sm ms-2'>
                                            <i class="bi bi-card-list"></i>
                                            </Link>
                                            <button className='btn btn-danger btn-sm ms-2' data-toggle="tooltip" data-placement="top" title="Delete">  
                                                <i className="bi bi-trash3"></i> 
                                            </button>
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

export default InstructorMyCourses;