import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom"; 

const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorDetail(){
    const [courseData, setcourseData] = useState([]);
    const [instructorData, setInstructorData] = useState([]);
    let {instructor_id} = useParams();


    useEffect(() =>{
        try{
            axios.get(baseUrl+'/instructor/'+ instructor_id).then((response) =>
            {
                setcourseData(response.data.instructor_courses);
                setInstructorData(response.data);
                //console.log(courseData)
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    return(
        
        <div className="container mt-5">
        <div className="row">
            <div className="col-2">
                <img src= {instructorData.profile_image}  className="img-thumbnail" alt="Instructor img"/>
            </div>
            <div className="col-10">
                <h3> {instructorData.full_name} </h3>
                <p> {instructorData.bio}</p>
                <div className="mb-1 fw-bold fs-6">
                <h5>Courses Taught:</h5>
                <div className="list-group list-group-flush">
                {courseData.map((course, index) => 
                    <Link to = {`/detail/${course.id}`}>{course.title}</Link>
                )}
                
                </div>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-header">
                <h5> More Details </h5>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{instructorData.email}</li>
            </ul>
        </div>
        {/* Can add related courses if needed */}
    </div>
    );
}

export default InstructorDetail;