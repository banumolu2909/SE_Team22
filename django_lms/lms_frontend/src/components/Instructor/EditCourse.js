import {Link } from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal  from 'sweetalert2';

const baseUrl = 'http://127.0.0.1:8000/api'

function EditCourse(){

    const [cats, setCats] = useState([]);
    const [courseData, setCourseData] = useState({
        category:'',
        title:'',
        description:'',
        old_image: '',
        course_image:'',
        technologies:''
    });
    const {course_id} = useParams();

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

        //To fetch the current course data when the page is loaded.
        try{
            axios.get(baseUrl+'/instructor-course-detail/'+course_id).then((response) =>
            {
                setCourseData({
                    category: response.data.category,
                    title: response.data.title,
                    description: response.data.description,
                    old_image: response.data.course_image,
                    technologies: response.data.technologies,
                    course_image:''
                });
            });
        }
        catch(error){
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
        const _formData = new FormData();
        _formData.append('category', courseData.category);
        _formData.append('instructor', 1);
        _formData.append('title', courseData.title);
        _formData.append('description', courseData.description);
        if (courseData.course_image!==''){
            _formData.append('course_image', courseData.course_image, courseData.course_image.name);
        }
        _formData.append('technologies', courseData.technologies);

        try{
            axios.put(baseUrl+ '/instructor-course-detail/'+course_id, _formData,{
                headers: {
                    'content-type': 'multipart/form-data'
                }
            })
            .then((response) => {
                // console.log(response.data);
                if (response.status==200){
                    Swal.fire({
                        title: 'Data has been modified',
                        toast: true,
                        icon: 'success',
                        position:'top-right',
                        showConfirmButton: false,
                        timer:3000,
                        timerProgressBar:true,
                        showCloseButton: true
                      });
             }
            });
    
        }catch(error){
            console.log(error);
        }
   };

    useEffect(() =>{
        document.title = 'Instructor Dashboard | Edit Course'
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
                            Edit Course
                        </h5>
                        <div className='card-body'>
                            <form>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="category">Category</label>
                                    <select name='category' value={courseData.category} onChange={handleChange} className='form-control'>
                                     {cats.map((category,index) => {return <option key={index} value={category.id}> {category.title} </option>})}
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="title">Title</label>
                                    <input type="text" value={courseData.title} name="title" onChange={handleChange} className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="description">Course Description</label>
                                    <textarea type="text" value={courseData.description} onChange={handleChange} name="description" className="form-control" />
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="course_image">Course Image</label>
                                    <input type="file" onChange={handleFileChange} name="course_image" className="form-control" />
                                    {courseData.old_image &&
                                        <img src={courseData.old_image} className='rounded' width="300"/>
                                    }  
                                </div>
                                <div className="mb-4">
                                    <label className="form-label" htmlFor="technologies">Technologies</label>
                                    <textarea type="text" value={courseData.technologies} onChange={handleChange} name="technologies" className="form-control" />
                                </div>
                                <div className="pt-1 mb-4">
                                    <button className="btn btn-dark btn-lg btn-block" onClick={formSubmit} type="button">Edit course</button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default EditCourse;