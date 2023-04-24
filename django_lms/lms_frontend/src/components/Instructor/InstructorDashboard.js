import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal  from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'


function InstructorDashboard(){

    const[dbData, setDbData] = useState([]);
    const instructorId = localStorage.getItem('instructorId'); 

    useEffect(() =>{
        try{
            axios.get(baseUrl+'/instructor/dashboard/' + instructorId).then((response) =>
            {
                console.log(response);
                setDbData(response.data);
            });
        }catch(error){
            console.log(error);
        }
      
    },[]);

    
    useEffect(() =>{
        document.title = 'Instructor Dashboard | Dashboard'
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
                <section className='col-md-9'>
                    <div className = 'row'>
                        <div className='col-md-4'>
                            <div className='card' >
                                <h5 className='card-header text-white' style={cardStyle}>My Courses</h5>
                                <div className='card-body'>
                                    <h3><Link to='/instructor-courses' className='text-dark'>{dbData.total_courses}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card border-info'>
                                <h5 className='card-header text-white' style={cardStyle}>My Students</h5>
                                <div className='card-body'>
                                    <h3><Link to='/my-students' className='text-dark'>{dbData.total_students}</Link></h3>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-4'>
                            <div className='card border-info'>
                                <h5 className='card-header text-white' style={cardStyle}>My Modules</h5>
                                <div className='card-body'>
                                    <h3><Link to='/instructor-courses' className='text-dark'>{dbData.total_modules}</Link></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default InstructorDashboard;