// import { Link, useParams } from "react-router-dom"; //A hook to get parameter of the URL and matches with the data from database

// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const baseUrl = 'http://127.0.0.1:8000/api';
// const siteUrl = 'http://127.0.0.1:8000/';


// function CourseDetails(){

//     const [courseData, setcourseData] = useState([]);
//     const [instructorData, setInstructorData] = useState([]);
//     const [studentLoginStatus, setStudentLoginStatus] = useState([]);
//     const [enrollStatus, setEnrollStatus] = useState([]);
//     let {course_id} = useParams();
//     const studentId = localStorage.getItem('studentId');
    
//     useEffect(() =>{
//         try{
//             axios.get(baseUrl+'/course/'+ course_id).then((response) =>
//             {
//                 setcourseData(response.data);
//                 setInstructorData(response.data.instructor);
//                 //console.log(response.data.module)
//             });
//         }
//         catch(error){
//             console.log(error);
//         }

//         //Fetch enroll status
//         try{
//             axios.get(baseUrl+'/fetch-enroll-status/'+ studentId + '/' +course_id).then((response) =>
//             {
//                 // console.log(response.data);
//                 // setEnrollStatus('success');
//                 if (response.data.boolean === true){
//                     setEnrollStatus('success');
//                 }
//             });
//         }
//         catch(error){
//             console.log(error);
//         }

//         const studentLoginStatus = localStorage.getItem('studentLoginStatus'); 
//         if (studentLoginStatus === 'true'){
//             setStudentLoginStatus('success');
//         }
//     },[]);

//     const enrollCourse = () => {   
//         //console.log("hi")     
//         const _formData = new FormData();
//         _formData.append('course', course_id);
//         _formData.append('student', studentId);
      
//         try {
//           axios.post(baseUrl + '/student-enroll-course/', _formData, {
//             headers: {
//               'content-type': 'multipart/form-data'
//             }
//           })
//             .then((response) => {
//                 console.log("hello")
//                 if (response.status === 200 || response.status === 201) {
//                     Swal.fire({
//                         title: 'You have successfully enrolled',
//                         toast: true,
//                         icon: 'success',
//                         position: 'top-right',
//                         showConfirmButton: false,
//                         timer: 4000,
//                         timerProgressBar: true,
//                         showCloseButton: true
//                     });
//                 //window.location.reload();
//                 setEnrollStatus('success');
//               }
      
//             });
      
//         } catch (error) {
//           console.log(error);
//         }
//       }
      

//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-2">
//                     <img src={courseData.course_image} className="img-thumbnail" alt="..."/>
//                 </div>
//                 <div className="col-10">
//                     <h3>{courseData.title}</h3>
//                     <p>{courseData.description}</p>
//                     <p className="mb-1 fw-bold fs-6">
//                         Course By: <Link to = {`/instructor-detail/${instructorData.id}`}>{instructorData.full_name}</Link>
//                     </p>
//                     <p className="mb-1 fw-bold fs-6">
//                         Total Enrolled: {courseData.total_enrolled_students} student(s)
//                     </p>
//                 </div>
//             </div>
//             <div className="container mt-4">

//                     {
//                         enrollStatus === 'success' && studentLoginStatus === 'success' &&
//                         <li className="list-group-item"><strong>You have enrolled in the course</strong></li>
//                     }

//                     {
//                         studentLoginStatus === 'success' && enrollStatus !== 'success' &&
//                         <li className="list-group-item"><button type = "button" onClick={enrollCourse} className="btn btn-success">Enroll</button></li>
//                     }
                    
//                     {
//                         studentLoginStatus !== 'success' &&
//                         <li className="list-group-item"><Link to='/user-login'  className="btn btn-info">Please login to enroll</Link></li>
//                     }
                
//             </div>
//         </div>

//     );
// }

// export default CourseDetails;

//import OwnCarousel from 'react-owl-carousel';
//import 'owl.carousel/dist/assets/owl.carousel.css';
//import 'owl.carousel/dist/assets/owl.theme.default.css';


// import { Link, useParams } from "react-router-dom"; //A hook to get parameter of the URL and matches with the data from database
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Swal from 'sweetalert2';

// const baseUrl = 'http://127.0.0.1:8000/api';
// const siteUrl = 'http://127.0.0.1:8000/';

// function CourseDetails(){
    
//     //const [moduleData, setModuleData] = useState([]);
//     const [courseData, setcourseData] = useState([]);
//     const [instructorData, setInstructorData] = useState([]);
//     const [userLoginStatus, setuserLoginStatus] = useState([]);
//     const [enrollStatus, setenrollStatus] = useState([]);
//     let {course_id} = useParams();
//     const student_id = localStorage.getItem('studentId');
//     // Fetch courses
//     useEffect(() =>{
//         try{
//             axios.get(baseUrl+'/course/'+ course_id).then((response) =>
//             {
//                 setcourseData(response.data);
//                 setInstructorData(response.data.instructor);
//                 //setInstructorData(response.data.instructor);
//                 //setModuleData(response.data.module);
//                 console.log(courseData)
//             });
//         }
//         catch(error){
//             console.log(error);
//         }

//         try{
//             axios.get(baseUrl+'/fetch-enroll-status/'+student_id+'/'+course_id).then((response) =>
//             {
//                 //console.log('This area')
//                 console.log(response.data)
                
//                 if(response.data.bool===true){
//                     setenrollStatus('success');
//                 }
//             });
//         }
//         catch(error){
//             console.log(error);
//         }
//         const studentLoginStatus = localStorage.getItem('studentLoginStatus');
//         if(studentLoginStatus==='true'){
//             setuserLoginStatus('success');
//         }
      
//     },[]);

//     // Enroll in course
//     const enrollCourse = () =>{

//         const _formData = new FormData();
//         _formData.append('course', course_id);
//         _formData.append('student', student_id);
//         try{
//             axios.post(baseUrl+'/student-enroll-course/', _formData,{
//                 headers:{
//                     'content-type':'multipart/form-data'
//                 }
//             })
//             .then((response) => {
//                 if (response.status===200 || response.status===201){
//                        Swal.fire({
//                            title: 'You have successfully enrolled in this course!',
//                            toast: true,
//                            icon: 'success',
//                            position:'top-right',
//                            showConfirmButton: false,
//                            timer:5000,
//                            timerProgressBar:true,
//                            showCloseButton: true
//                          });
//                 }
//                //window.location.href = '/edit-module/1'
//            });
//         }catch(error){
//             console.log(error);
//         }
    
//     }
//     return (
//         <div className="container mt-5">
//             <div className="row">
//                 <div className="col-2">
//                     <img src={courseData.course_image} className="img-thumbnail" alt="..."/>
//                 </div>
//                 <div className="col-10">
//                     <h3>{courseData.title}</h3>
//                     <p>{courseData.description}</p>
//                     {console.log(instructorData.full_name)}
//                     <p className="mb-1 fw-bold fs-6">Course By: <Link to = {`/instructor-detail/${instructorData.id}`}>{instructorData.full_name}</Link></p>
//                     <p className="mb-1 fw-bold fs-6">Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
//                     {
//                         enrollStatus === 'success' && userLoginStatus==='success' &&
//                         <p><span>You are already enrolled in this course</span></p>
//                     }
//                     { userLoginStatus==='success' && enrollStatus !== 'success' &&
//                     <p><button type='button' onClick={enrollCourse} className="btn btn-success">Enroll in this Course</button> </p>
//                     }
                    
//                     { userLoginStatus !=='success' && 
//                     <p><Link to='/user-login/' >Please Login to enroll</Link> </p>
//                     }
//                     </div>
//             </div>
//             {/* Can add related courses if needed */}
//         </div>

//     );
// }

// export default CourseDetails;

// import OwnCarousel from 'react-owl-carousel';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Link, useParams } from "react-router-dom"; //A hook to get parameter of the URL and matches with the data from database
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api';
const siteUrl = 'http://127.0.0.1:8000/';

function CourseDetails(){
    
    
    const [courseData, setcourseData] = useState([]);
    const [instructorData, setInstructorData] = useState([]);
    const [moduleData, setModuleData] = useState([]);
    const [assignmentData, setassignmentData] = useState([]);
    const [userLoginStatus, setuserLoginStatus] = useState([]);
    const [enrollStatus, setenrollStatus] = useState([]);
    let {course_id} = useParams();
    const student_id = localStorage.getItem('studentId');
    // Fetch courses
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/course/'+ course_id).then((response) =>
            {
                console.log('Var checks');
                console.log(moduleData.id, instructorData.id, courseData.id);
                
                setcourseData(response.data);
                setInstructorData(response.data.instructor);
                setModuleData(response.data.course_modules);
                setassignmentData(response.data.course_assignments);
                console.log('Course Module Data');
                console.log(response.data.course_modules);

                console.log(moduleData.id, instructorData.id, courseData.id, assignmentData.id);
                console.log(moduleData.title, instructorData.full_name);
            });
        }
        catch(error){
            console.log(error);
        }

        try{
            axios.get(baseUrl+'/fetch-enroll-status/'+student_id+'/'+course_id).then((response) =>
            {
                // console.log('This area')
                // console.log(response.data)
                
                if(response.data.bool===true){
                    setenrollStatus('success');
                }
            });
        }
        catch(error){
            console.log(error);
        }

        const studentLoginStatus = localStorage.getItem('studentLoginStatus');
        if(studentLoginStatus==='true'){
            setuserLoginStatus('success');
        }
      
    },[]);

    // Enroll in course
    const enrollCourse = () =>{

        const _formData = new FormData();
        _formData.append('course', course_id);
        _formData.append('student', student_id);
        try{
            axios.post(baseUrl+'/student-enroll-course/', _formData,{
                headers:{
                    'content-type':'multipart/form-data'
                }
            })
            .then((response) => {
                if (response.status===200 || response.status===201){
                       Swal.fire({
                           title: 'You have successfully enrolled in this course!',
                           toast: true,
                           icon: 'success',
                           position:'top-right',
                           showConfirmButton: false,
                           timer:5000,
                           timerProgressBar:true,
                           showCloseButton: true
                         });
                }
               //window.location.href = '/edit-module/1'
           });
        }catch(error){
            console.log(error);
        }
    
    }



    useEffect(() =>{
        document.title = 'Course Details'
    })

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-2">
                    <img src={courseData.course_image} className="img-thumbnail" alt="..."/>
                </div>
                <div className="col-10">
                    <h3>{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p className="mb-1 fw-bold fs-6">Course By: <Link to = {`/instructor-detail/${instructorData.id}`}>{instructorData.full_name}</Link></p>
                    <p className="mb-1 fw-bold fs-6">Total Enrolled: {courseData.total_enrolled_students} Student(s)</p>
                    {
                        enrollStatus === 'success' && userLoginStatus==='success' &&
                        <p><span>You are already enrolled in this course</span></p>
                    }
                    { userLoginStatus==='success' && enrollStatus !== 'success' &&
                    <p><button type='button' onClick={enrollCourse} className="btn btn-success">Enroll in this Course</button> </p>
                    }
                    
                    { userLoginStatus !=='success' && 
                    <p><Link to='/user-login/' >Please login as a student to enroll</Link> </p>
                    }
                </div>
            </div>

            {enrollStatus === 'success' && userLoginStatus==='success' &&
            <div className="card my-4">
                <div className="card-header">
                    <h5>Course Content</h5>
                </div>
                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Module</th>
                                            <th>Description</th>
                                            <th>Lecture</th>
                                            {/* <th>File</th> */}
                                            {/* <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {moduleData.map((row, index) => 
                                    <tr>
                                         <td>{row.title}</td>
                                         <td>{row.description}</td>
                                        <td>
                                         <video controls width="250">
                                                <source src={row.video} type="video/mp4"/>
                                            </video>
                                            </td>
                                         {/* <td><Link to={`assignmentData`} target="_blank" download={row.title}>{row.title}<i class="bi bi-download"></i></Link></td>
                                         <td>
                                        <Link to={`/submit-assignment/` + row.id} className='btn btn-success btn-sm active'>View Assignment</Link>
                                         </td> */}
                                    </tr> 
                                    )}
                                    <tr></tr>
                                    </tbody>
                                </table>
            </div>
            }

            {enrollStatus === 'success' && userLoginStatus==='success' &&
            <div className="card my-4">
                <div className="card-header">
                    <h5>Assignments</h5>
                </div>
                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            {/* <th>Course Code</th> */}
                                            <th>Title</th>
                                            <th>Description</th>
                                            <th>Deadline</th>
                                            <th>File</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {assignmentData.map((row, index) => 
                                    <tr>
                                         <td className="col-sm-2">{row.title}</td>
                                         <td className="col-sm-4">{row.description}</td>
                                         <td className="col-sm-2">{row.deadline}</td>
                                         <td className="col-sm-2"><Link to={`assignmentData`} target="_blank" download={row.title}>{row.title}<i class="bi bi-download"></i></Link></td>
                                         <td className="col-sm-2">
                                        <Link to={`/submit-assignment/` + row.id} className='btn btn-success btn-sm active'>View Assignment</Link>
                                         </td>
                                    </tr> 
                                    )}
                                    <tr></tr>
                                    </tbody>
                                </table>
            </div>
            }



        </div>

    );
}

export default CourseDetails;