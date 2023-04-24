import {Link} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'

const baseUrl = 'http://127.0.0.1:8000/api'

function CourseModules(){

    const [moduleData, setModuleData] = useState([]);
    const [totalResult, setTotalResult] = useState([0]);
    const {course_id} = useParams();
    // console.log(course_id);

    // Fetching the modules when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/course-modules/'+ course_id).then((response) =>
            {
                setModuleData(response.data);
                setTotalResult(response.data.length);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    //To delete the module
    const Swal = require('sweetalert2')
    const handleDelete = (module_id) => {
        Swal.fire({
            title: 'Confirm',
            text: 'Are you sure you want to delete this module?',
            icon: 'info',
            confirmButtonText: 'Yes',
            showCancelButton:true
          }).then((result) =>{
            if(result.isConfirmed){
                try{
                    axios.delete(baseUrl+'/module/'+module_id)
                    .then((response)=>{
                        Swal.fire('Success', "Data has been deleted." );
                        try{
                            axios.get(baseUrl+'/course-modules/'+ course_id).then((response) =>
                            {
                                setModuleData(response.data);
                                setTotalResult(response.data.length);
                            });
                        }
                        catch(error){
                            console.log(error);
                        }
                        // console.log(response);
                        // setTotalResult(response.data.length);
                        // setModuleData(response.data);
                    });
                    Swal.fire('Success', "Data has been deleted." );
                } catch(error){
                    Swal.fire('Error','Error occured!');
                }
            }
            else{
                Swal.fire('error','Error occured!');
            }
          });
    }
    const cardStyle ={
        backgroundColor: "#990000"
    }

    return(
        <div className='container mt-4 col-md-12'>
        <div className = "row">
            <aside className='col-md-2' >
                <InstructorLeftSideBar/>
            </aside>
            <section className='col-md-10'>
            <div className="card">
                <h5 className='card-header text-white' style={cardStyle} >All modules ({totalResult}) <Link className='btn btn-success btn-sm float-end' to={'/add-module/'+course_id}>Add Module</Link> </h5>
                        <div className='card-body'>
                        <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Module</th>
                                            <th>Lecture</th>
                                            <th>Description</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {moduleData.map((module,index) => 
                                        <tr>
                                         <td><Link to={'/edit-module/' +module.id}>{module.title}</Link></td>
                                         <td>
                                            <video controls width="250">
                                                <source src={module.video} type="video/webm"/>

                                                <source src={module.video} type="video/mp4"/>

                                                Download the
                                                <a href="/media/cc0-videos/flower.webm">WEBM</a>
                                                or
                                                <a href="/media/cc0-videos/flower.mp4">MP4</a>
                                                video.
                                            </video>

                                         </td>
                                         <td>{module.description}</td>
                                        <td> 
                                            
                                            <Link to={'/edit-module/' +module.id} className='btn btn-info btn-sm mx-1 my-1'>
                                                <i className="bi bi-pencil-square"></i>
                                            </Link>
                                            <button onClick={()=>handleDelete(module.id)} to={'/delete-module/' +module.id} className='btn btn-danger btn-sm mx-1 my-1'> 
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
    )
}

export default CourseModules;  