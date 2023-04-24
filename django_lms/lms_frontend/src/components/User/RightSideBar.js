import {Link} from 'react-router-dom';
function RightSideBar(){

    return(
                <div className='container col-md-3 mt-4'>
                    <div className='card'>
                        <h6 className="card-header text-center">
                            To Dos
                        </h6>
                        <div className='list-group list-group-flush'>
                            <Link className='list-group-item list-group-item-action' to='/'>All Assignments</Link>
                        </div>
                    </div>
                    <div className='card mt-4'>
                        
                        <div className="list-group list-group-flush">
                            <Link className="list-group-item">View all Grades</Link>
                            <Link className="list-group-item">View all notifications</Link>
                        </div>
                    </div>
                </div>  

    );

}

export default RightSideBar