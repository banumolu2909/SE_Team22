import {Link } from 'react-router-dom';
import CourseDetails from './CourseDetails';
import AllCourses from './AllCourses';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'


function Home(){


    const [courseData, setcourseData] = useState([]);
    // Fetching the courses when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/course/?res=4').then((response) =>
            {
                setcourseData(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    const [instructorData, setInstructorData] = useState([]);
    // Fetching the instructors when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/instructor/?res=4').then((response) =>
            {
                setInstructorData(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    useEffect(() => {
        document.title = 'Crimson Board | Home'
    });

    const divText ={
        color: "#990000",
        textDecoration: "None"
    }

      

  return (

    <div className = "container ms-6 mt-4" style={divText}>
        {/* Latest Courses */}
        <h3 className = "pb-3 my-1 mt-5"> Latest Courses<Link to = "/all-courses" style={divText} className = "float-end"> See All</Link></h3>
        <div className = "row mb-5">
        {courseData && courseData.map((course, index) =>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <Link style={divText} to = {`detail/${course.id}`}> <img src= {course.course_image} className="card-img-top img-thumbnail" alt={course.title}/></Link>
                    <div className="card-body">
                        <Link to = {`detail/${course.id}`}style={divText}> <h5 className="card-title">{course.title}</h5> </Link>
                    </div>
                </div>
            </div>
            )} 
        </div>
        {/* End of Latest courses */}

        
        {/* Professor Details */}
        <h3 className = "pb-3 my-1 mt-5"> Our Esteemed Instructors<Link to = "/all-courses" style={divText} className = "float-end"> See All</Link></h3>
        <div className = "row mb-5">
        {instructorData && instructorData.map((instructor, index) =>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <Link style={divText} to = {`instructor-detail/${instructor.id}`}> <img src= {instructor.profile_image} className="card-img-top img-thumbnail" alt={instructor.full_name}/></Link>
                    <div className="card-body">
                        <Link to = {`instructor-detail/${instructor.id}`}style={divText}> <h5 className="card-title">{instructor.full_name}</h5> </Link>
                    </div>
                </div>
            </div>
            )} 
        </div>

        {/* Esteemed Instructors */}
        {/* <h3 className = "pb-3 my-1 mt-5" style={divText}> Our Esteemed Instructors<Link style={divText} to = "/all-instructors" className = "float-end"> See All</Link></h3>
        <div className = "row mb-5">
            <div className = "col-md-3">
                <div className="card">
                    <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <a href = "#"> <h5 className="card-title">Hannah Baker</h5> </a>
                    </div>
                </div>
            </div>
            <div className = "col-md-3">
                <div className="card">
                    <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <a href = "#"> <h5 className="card-title">James Packer</h5> </a>
                    </div>
                </div>
            </div>
            <div className = "col-md-3">
                <div className="card">
                    <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <a href = "#"> <h5 className="card-title">Jim Halpert</h5> </a>
                    </div>
                </div>
            </div>
            <div className = "col-md-3">
                <div className="card">
                    <a href = "#"> <img src="logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <a href = "#"> <h5 className="card-title">Micheal Scott</h5> </a>
                    </div>
                </div>
            </div>
        </div> */}
        {/* End of Esteemed Instructors */}


        {/* Student success stories */}
        <h3 style={divText} className = "pb-3 my-1 mt-3"> Our Success stories</h3>
        <div id="carouselExampleIndicators" className="carousel carousel-dark bg-light d-md slide py-5" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type = "button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"
                aria-current = "true" aria-label= "Slide 1"></button>
                <button type = "button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" className="active"
                aria-current = "true" aria-label= "Slide 2"></button>
                <button type = "button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" className="active"
                aria-current = "true" aria-label= "Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <figure className="text-center">
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">Crimson Board is the best online learning platform out there!</p>
                            <footer className="blockquote-footer mt-3">Dwight Schrute </footer>
                        </blockquote>
                    </figure>
                </div>
                <div className="carousel-item">
                <figure className="text-center">
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">I couldn't have passed my art course without Crimson Board's guidance and support.</p>
                            <footer className="blockquote-footer mt-3"> Pamela Beesly </footer>
                        </blockquote>
                    </figure>
                </div>
                <div className="carousel-item">
                <figure className="text-center">
                        <blockquote className="blockquote text-center">
                            <p className="mb-0">Crimson Board gave me a new perspective on the world and I'm so grateful for the opportunity.</p>
                            <footer className="blockquote-footer mt-3">Creed Bratton</footer>
                        </blockquote>
                    </figure>
                </div>
            </div> 
        </div>
        {/* End of Student Testimonial */}

    </div>
  );
}

export default Home ;
