import {Link} from 'react-router-dom';

function InstructorRightSideBar(){

    return(
                <div className='container'>
                    <div className='card'>
                        <h6 className="card-header text-center">
                            To Dos
                        </h6>
                        <div className='list-group list-group-flush'>
                            <Link className='list-group-item list-group-item-action' to='/'>Post assignments</Link>
                        </div>
                    </div>
                    <div className='card mt-4'>
                        
                        <div className="list-group list-group-flush">
                            <Link className="list-group-item">Grade assignments</Link>
                            <Link className="list-group-item">Post notifications</Link>
                        </div>
                    </div>
                </div>  

    );

}

export default InstructorRightSideBar