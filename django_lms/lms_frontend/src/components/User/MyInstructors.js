import {Link} from 'react-router-dom';
import LeftSideBar from './LeftSideBar';
import { useState, useEffect } from 'react';
import InstructorMessageList from './StudentMessageList';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function MyInstructors(){

    const [instructorData, setinstructorData] = useState([]);
    const studentId = localStorage.getItem('studentId'); 

    // Fetching the courses when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/fetch-my-instructors/'+ studentId).then((response) =>
            {
                console.log(response.data);
                setinstructorData(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
      
    },[]);

    useEffect(() => {                           
        document.title = 'Student | My Instructors';      //an effect hook
    });

    const [msgData, setmsgData] = useState({
        msg_text: '',
    })

    const [errorMsg, setErrorMsg] = useState('');
    const [successMsg, setSuccessMsg] = useState('');

    const handleChange = (event) => {
        setmsgData({
            ...msgData, [event.target.name]: event.target.value
        });
    }

    const formSubmit =(instructor_id)=>{
        const _formData = new FormData(); 
        _formData.append('msg_text', msgData.msg_text);
        _formData.append('msg_from', 'student');
        
        try{
            axios.post(baseUrl+ '/send-message/' + instructor_id + '/' +studentId, _formData)
            .then((response) => {
                console.log("1",response.data.bool)
                 if (response.data.bool === true){
                        setmsgData({
                            'msg_text': ''
                        })
                       setSuccessMsg(response.data.msg);
                       setErrorMsg('');
                 }
                 else{
                    setErrorMsg(response.data.msg);
                    setSuccessMsg('');
                 }
            });
    
        }catch(error){
            console.log(error);
        }
   };

   const msgList ={
    height: '500px',
    overflow: 'auto'
}
function refreshPage() {
    window.location.reload(false);
  }

  const cardStyle ={
    backgroundColor: "#990000"
}

    return(
        <div className='container mt-4'>
            <div className = "row">
            <aside className='col-md-3'>
                        <LeftSideBar/>
                    </aside>
                <section className='col-md-9'>
                <div className="card">
                <h5 className='card-header text-white' style={cardStyle}> My Instructors</h5>
                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            <th>Instructor</th>
                                            {/* <th>Course Name</th> */}
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {instructorData.map((row,index) =>
                                    <tr>
                                         <td><Link to= {`/instructor-detail/` +row.instructor.id}>{row.instructor.full_name}</Link></td>
                                         {/* {console.log("hi",row.instructor.full_name)} */}
                                         {/* <td><Link to= {`/all-modules/` +course.id}>{course.title}</Link></td> */}
                                        <td> 
                                        <button className='btn btn-sm btn-default mx-2' data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} title='Send Message'>
                                                <i className="bi bi-chat-dots-fill"></i>
                                        </button>

<div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
            <span className='text-danger'>{row.instructor.full_name}</span>
        </h5>
        <span className='btn btn-lg title="refresh' onClick={refreshPage}><i className="bi bi-arrow-clockwise"></i></span>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className='row'>
            <div className='col-md-8 mb-2 col-12 border-end' style={msgList}>
            <InstructorMessageList instructor_id = {row.instructor.id} student_id = {studentId}/>
            </div>
            <div className='col-md-4 col-12'>
                {successMsg && <p className='text-success'>{successMsg}</p>}
                {errorMsg && <p className='text-danger'>{errorMsg}</p>}
            <form> 
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Message</label>
                    <textarea className='form-control' value={msgData.msg_text} name='msg_text' onChange={handleChange} rows='5'></textarea>
                    <div id="msg" className="form-text text-muted">Add your message here.</div>
                </div>
                <button type="button" className="btn btn-primary" onClick={() => formSubmit(row.instructor.id)}>Send</button>
                </form>  
            </div> 
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
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
        
    );
}

export default MyInstructors;