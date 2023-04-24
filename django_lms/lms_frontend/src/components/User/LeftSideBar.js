import {Link} from 'react-router-dom';
function LeftSideBar(){
    const cardStyle ={
        backgroundColor: "#990000"
    }
    return(
        <div className='card text-white' style={cardStyle}>
                        <h6 className='card-header text-center'> CRIMSON BOARD</h6>
                        <div className='list-group list-group-flush'>
                            <Link className='list-group-item list-group-item-action' to="/my-account">My Profile</Link>
                            <Link className='list-group-item list-group-item-action' to="/user-dashboard">Dashboard</Link>
                            <Link className='list-group-item list-group-item-action' to="/my-courses">Courses </Link>
                            {/* <Link className='list-group-item list-group-item-action' to="/calendar">Calendar </Link> */}
                            {/* <Link className='list-group-item list-group-item-action' to="/chat">Chat</Link> */}
                            <Link className='list-group-item list-group-item-action' to="/calendar">Assignments </Link>
                            <Link className='list-group-item list-group-item-action' to="/my-instructors">My Instructors </Link>
                            <Link className='list-group-item list-group-item-action' to="/student-change-password">Change Password</Link>
                            <Link className='list-group-item list-group-item-action text-danger' to="/user-logout">Logout </Link>
                        </div>
                    </div>
    );

}

export default LeftSideBar