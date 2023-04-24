import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api/'            //setting the base URL
function AllInstructors(){
    const[instructor, setInstructor] = useState(null); //the instructor data is first null and the data will be set in "setInstuctor" 
    useEffect(() =>{
        //console.log('Component loaded')             //this will create a side effect and show the message in console
        axios.get(baseUrl+'instructor/').then((response) => {  
            //console.log(response.data);                 //axios returns all the data in the default 'data' obj
            setInstructor(response.data);
        });
    },[]);
    console.log(instructor);
    
    return(
        <div className="container mt-4">
        <h3 className = "pb-3 my-1 mt-5"> Our Instructors </h3>
        <div className = "row mb-5">
        {instructor && instructor.map((instructor, index) =>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <Link to = {`http://localhost:3000/detail/${instructor.id}`}> <img src= {instructor.profile_image} className="card-img-top img-thumbnail" alt={instructor.full_name}/></Link>
                    <div className="card-body">
                        <Link to = {`http://localhost:3000/detail/${instructor.id}`}> <h5 className="card-title">{instructor.full_name}</h5> </Link>
                    </div>
                </div>
            </div>
            )}

        </div>

            
        </div>

    
)};

export default AllInstructors;