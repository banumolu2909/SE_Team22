// to remove the data of logged in user when clicked on logout. 


function InstructorLogout(){

   localStorage.removeItem('instructorLoginStatus');
   localStorage.removeItem('instructorId');  
    window.location.href = 'instructor-login';
     
    return(
        <div></div>

    );

}

export default InstructorLogout;