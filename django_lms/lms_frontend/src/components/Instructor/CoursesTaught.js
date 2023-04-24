
import {Link} from 'react-router-dom';
import courseData from './InstructorMyCourses';
function CoursesTaught(){

    return(
            <div className="row">
            <section className='col-md-7'>
                            <div className="card">
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {courseData.map((index,course) => 
                                        <tr>
                                        <td>{course.id}</td>
                                         <td>{course.title}</td>
                                        <td> 
                                            <Link to='/add-content/2' className='btn btn-success btn-sm'>
                                                Add content
                                                </Link>
                                        </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>

                            </div>
                                
                            </div>


                            </section>

            </div>

    );


}

export default CoursesTaught;

