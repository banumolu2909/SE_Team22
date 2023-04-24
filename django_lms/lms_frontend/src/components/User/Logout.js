// to remove the data of logged in user when clicked on logout. 


function Logout(){

    localStorage.removeItem('studentLoginStatus'); 
    localStorage.removeItem('studentId'); 
    window.location.href = '/user-login';
     
    return(
        <div></div>
    );
}

export default Logout;