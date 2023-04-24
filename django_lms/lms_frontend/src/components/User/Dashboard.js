import {Link} from 'react-router-dom';
import MyCourses from './MyCourses';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import { useState,useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

    

function Dashboard(){

    const[dbData, setDbData] = useState([]);
    const student_id = localStorage.getItem('studentId'); 

    useEffect(() =>{
        try{
            axios.get(baseUrl+'/user/dashboard/' + student_id).then((response) =>
            {
                console.log(response);
                setDbData(response.data);
            });
        }catch(error){
            console.log(error);
        }
      
    },[]);

    
    useEffect(() =>{
        document.title = 'Student | Dashboard'
    })

    const cardStyle ={
        backgroundColor: "#990000"
    }


    return (
            <div className='container mt-4'>
                <div className='row'>
                    <aside className='col-md-3'>
                        <LeftSideBar/>
                    </aside>
                    <section className='col-md-9'>
                        <div className = 'row'>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <h5 className='card-header text-white'style={cardStyle} >My Courses</h5>
                                    <div className='card-body'>
                                        <h3><Link to='/my-courses' className='text-dark'>{dbData.total_courses}</Link></h3>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <h5 className='card-header text-white' style={cardStyle}>My Modules</h5>
                                    <div className='card-body'>
                                        <h3><Link to='/my-courses' className='text-dark'>{dbData.total_courses}</Link></h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
    
export default Dashboard;