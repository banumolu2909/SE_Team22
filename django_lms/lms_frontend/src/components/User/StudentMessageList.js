import { useState, useEffect } from 'react';
import axios from 'axios';

const baseUrl = 'http://127.0.0.1:8000/api'

function InstructorMessageList(props){
    const [msgData, setmsgData] = useState([]);
    useEffect(() =>{
        try{
            axios.get(baseUrl+'/get-messages/' + props.instructor_id+ '/'+ props.student_id).then((response) =>
            {
                setmsgData(response.data);
            });
        }
        
        catch(error){
            console.log(error);
        }
      
    },[]);

    return(
        <>
        {msgData.map((row, index) =>
                <div className='row mb-2'>
                {row.msg_from !== 'student' && 
                    <div className='col-5'>
                        <div className="alert alert-info mb-1">
                            {row.msg_text}
                        </div>
                        <small className='text-muted float-end'>{row.msg_time}</small>
                </div>
                }
                {row.msg_from === 'student' && 
                    <div className='col-5 offset-7'>
                        <div className="alert alert-success mb-1">
                            {row.msg_text}
                        </div>
                        <small className='text-muted float-end'>{row.msg_time}</small>
                </div>
                }
                </div>
        )}
</>
)};


export default InstructorMessageList;