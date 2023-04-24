import {Link, useParams} from 'react-router-dom';
import InstructorLeftSideBar from './InstructorLeftSideBar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import InstructorMessageList from './InstructorMessageList';

const baseUrl = 'http://127.0.0.1:8000/api'

function MyStudents(){

    const [studentData, setstudentData] = useState([]);
    const instructorId = localStorage.getItem('instructorId'); 

    // Fetching the courses when the page loads 
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/fetch-all-enrolled-students/' + instructorId).then((response) =>
            {
                setstudentData(response.data);
            });
        }
        catch(error){
            console.log(error);
        }
    },[]);

    const [groupMsgData, setgroupMsgData] = useState({
        msg_text: '',
    })
    const [groupErrorMsg, setgroupErrorMsg] = useState('');
    const [groupSuccessMsg, setgroupSuccessMsg] = useState('');

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

    const formSubmit =(student_id)=>{
        const _formData = new FormData(); 
        _formData.append('msg_text', msgData.msg_text);
        _formData.append('msg_from', 'instructor');
        
        try{
            axios.post(baseUrl+ '/send-message/' +instructorId + '/' +student_id, _formData)
            .then((response) => {
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

    
    const grouphandleChange = (event) =>{
        setgroupMsgData({   
            ...groupMsgData, [event.target.name]: event.target.value
        });
    }

    //Post group message
    const groupformSubmit =()=>{
        const _formData = new FormData(); 
        _formData.append('msg_text', groupMsgData.msg_text);
        _formData.append('msg_from', 'instructor');
    
        try{
            axios.post(baseUrl+ '/send-group-message/' +instructorId, _formData)
            .then((response) => {
                if (response.data.bool === true){
                    setgroupMsgData({
                            'msg_text': ''
                        })
                        setgroupSuccessMsg(response.data.msg);
                        setgroupErrorMsg('');
                }
                else{
                    setgroupErrorMsg(response.data.msg);
                    setgroupSuccessMsg('');
                }
            });

        }catch(error){
            console.log(error);
        }
    };

    useEffect(() =>{
        document.title = 'Instructor | My Students'
    })

    const msgList ={
        height: '500px',
        overflow: 'auto'
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
                    <h5 className='card-header text-white' style={cardStyle}>
                        All Students
                        {/* <button type="button" className="btn btn-success float-end btn-md" data-bs-toggle="modal" data-bs-target="#groupMsgModal">
                            Send Group message
                        </button> */}
                    </h5>
                    {/* For Announcement */}
                    {/* <div className="modal fade" id="groupMsgModal" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="groupMsgModal">Send Group Message</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                        {groupSuccessMsg && <p className='text-success'>{groupSuccessMsg}</p>}
                                        {groupErrorMsg && <p className='text-danger'>{groupErrorMsg}</p>}
                                    <form> 
                                        <div className="mb-3">
                                            <label for="exampleInputEmail1" className="form-label">Message</label>
                                            <textarea className='form-control' value={groupMsgData.msg_text} name='msg_text' onChange={grouphandleChange} rows='10'></textarea>
                                            <div id="msg" className="form-text text-muted">Add your message here.</div>
                                        </div>
                                        <button type="button" className="btn btn-primary" onClick={groupformSubmit}>Send</button>
                                        </form>   
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                        </div> */}

                            <div className='card-body'>
                                <table className='table table-bordered'>
                                    <thead>
                                        <tr>
                                            {/* <th>Course Code</th> */}
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Username</th>
                                            <th>Interested Categories</th>
                                            <th>Course Enrolled</th>
                                            
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {studentData.map((row,index) => 
                                    <tr>
                                         <td><Link to= {`/view-student/` + row.student.id}>{row.student.full_name}</Link></td>
                                         <td>{row.student.email}</td>
                                         <td>{row.student.username}</td>
                                         <td>{row.student.interested_categories}</td>
                                         <td><Link to= {`/detail/` + row.course.id}>{row.course.title}</Link></td>
                                         
                                         {console.log(studentData)}
                                         {/* 
                                         <td>
                                            <button className='btn btn-sm btn-default mx-2' data-bs-toggle="modal" data-bs-target={`#msgModal${index}`} title='Send Message'>
                                                <i className="bi bi-chat-dots-fill"></i>
                                            </button> */}

{/* For chat */}
{/* <div className="modal fade" id={`msgModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-scrollable modal-fullscreen">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">
            <span className='text-danger'>{row.student.full_name}</span>
        </h5>
        <span className='btn btn-lg title="refresh'><i className="bi bi-arrow-clockwise"></i></span>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className='row'>
            <div className='col-md-8 mb-2 col-12 border-end' style={msgList}>
            <InstructorMessageList instructor_id = {instructorId} student_id = {row.student.id}/>
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
                <button type="button" className="btn btn-primary" onClick={() => formSubmit(row.student.id)}>Send</button>
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

                                         </td> */}
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

export default MyStudents;