import {Link} from 'react-router-dom';
import LeftSideBar from './LeftSideBar';

function StudentChangePassword(){

    const cardStyle ={
        backgroundColor: "#990000"
    }
    return (
        <div className='container mt-4'>
            <div className = "row">
            <aside className='col-md-3'>
                        <LeftSideBar/>
                    </aside>
                <section className='col-md-9'>
                <div className='card'>
                    <h5 className='card-header text-white' style={cardStyle}> Change Password </h5>
                    <div className='card-body'>
                        <div className="mb-3 row">
                            <label for="password" className="col-sm-2 col-form-label">Password</label>
                            <div className="col-sm-10">
                            <input type="password" className = "form-control" id="password"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="newpassword" className="col-sm-2 col-form-label">New Password</label>
                            <div className="col-sm-10">
                            <input type="password" className = "form-control" id="newpassword"/>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="confirm" className="col-sm-2 col-form-label">Confirm Password</label>
                            <div className="col-sm-10">
                            <input type="password" className = "form-control" id="confirm"/>
                            </div>
                        </div>
                        <div className="col-md-2 float-end mx-3 my-1 row">
                            <button className='btn btn-info'>Update</button>
                        </div>
                        <div className="col-md-2 float-end mx-3 my-1 row">
                            <button className='btn btn-dark'>Cancel</button>
                        </div>

                    </div>

                </div>
                
                </section>
            </div>
        </div>
    )
}

export default StudentChangePassword;