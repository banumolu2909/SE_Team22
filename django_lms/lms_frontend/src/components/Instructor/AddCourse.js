import {Link } from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function AddCourse(){

    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category:'',
        title:'',
        description:'',
        course_image:'',
        technologies:''
    });

    // To fetch the categories when the page is loaded. 
    useEffect(() => {
        try{
            axios.get(baseUrl+ '/category')
            .then((response) => {
                setCats(response.data);
            });
    
        }catch(error){
            console.log(error);
        }

    },[]);

   // console.log(cats)

   const handleChange = (event) =>{
        setCourseData({
            ...courseData,
            [event.target.name]: event.target.value
        });
   }

   const handleFileChange = (event) =>{
        setCourseData({
            ...courseData,
            [event.target.name]:event.target.files[0]
        });
   }

   const formSubmit =()=>{
        const instructorId = localStorage.getItem('instructorId'); 
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('instructor', instructorId);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        _formData.append('course_image', courseData.course_image, courseData.course_image.name);
        _formData.append('technologies', courseData.technologies);

        try{
            axios.post(baseUrl+ '/course/', _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                // console.log(response.data);
                window.location.href = '/add-course'
            });
    
        }catch(error){
            console.log(error);
        }
   };

    useEffect(() =>{
        document.title = 'Instructor Dashboard | Add courses'
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
                <div className='col-9'>
                    <div className='card'>
                        <h5 className='card-header text-white' style={cardStyle}>
                            Add Course
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select name='category' onChange={handleChange} className='form-control'>
                                     {cats.map((category,index) => {return <option key={index} value={category.id}> {category.title} </option>})}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="title">Title</label>
                                    <input type="text" name="title" onChange={handleChange} className="form-control form-control-lg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="description">Course Description</label>
                                    <textarea type="text" onChange={handleChange} name="description" className="form-control form-control-lg" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="course_image">Course Image</label>
                                    <input type="file" onChange={handleFileChange} name="course_image" className="form-control form-control-md" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="technologies">Technologies</label>
                                    <textarea type="text" onChange={handleChange} name="technologies" className="form-control form-control-lg" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block" onClick={formSubmit} type="button">Add course</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default AddCourse;