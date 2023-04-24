import Home from './Home';
import About from './About';
import Header from './Header';
import Footer from './Footer';
import InstructorDetail from './InstructorDetail';
import Search from './Search';
import {Routes, Route} from 'react-router-dom';

// Students
import CourseDetails from './CourseDetails';
import Login from './User/Login';
import Logout from './User/Logout';
import Register from './User/Register';
import Dashboard from './User/Dashboard';
import MyCourses from './User/MyCourses';
import Account from './User/Account';
import StudentChangePassword from './User/StudentChangePassword';
import VerifyStudent from './User/VerifyStudent';
import SubmitAssignment from './User/SubmitAssignment';

// Instructors
import InstructorLogin from './Instructor/InstructorLogin';
import VerifyInstructor from './Instructor/VerifyInstructor';
import InstructorRegister from './Instructor/InstructorRegister';
import InstructorDashboard from './Instructor/InstructorDashboard';
import InstructorAccount from './Instructor/InstructorAccount';
import InstructorMyCourses from './Instructor/InstructorMyCourses';
import MyStudents from './Instructor/MyStudents';
import AddCourse from './Instructor/AddCourse';
import EditCourse from './Instructor/EditCourse';
import InstructorLogout from './Instructor/InstructorLogout';
import AllModules from './Instructor/CourseModules';
import EditModule from './Instructor/EditModule';
import EnrolledStudents from './Instructor/EnrolledStudents';
import InstructorChangePassword from './Instructor/InstructorChangePassword';
import InstructorAssignments from './Instructor/InstructorAssignments';
import ViewEditAssignment from './Instructor/ViewEditAssignment';
import AddAssignment from './Instructor/AddAssignment'; 
import ViewSubmission from './Instructor/ViewSubmission';
import GradeSubmission from './Instructor/GradeSubmission';


// Listing pages 
import AllCourses from './AllCourses';
import AllInstructors from './AllInstructors';
import CategoryCourses from './CategoryCourses';
import AddModule from './Instructor/AddModule';
import InstructorForgotPassword from './Instructor/InstructorForgotPassword';
import InstructorResetPassword from './Instructor/InstructorResetPassword';
import StudentForgotPassword from './User/StudentForgotPassword';
import StudentResetPassword from './User/StudentResetPassword';
import MyInstructors from './User/MyInstructors';







function Main() {
  return (
    <div className="App">
        <Header/>
        {/* Routes act as a switch that will only load the component that is required */}
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/detail/:course_id' element={<CourseDetails/>}/>
            <Route path='/user-login' element={<Login/>}/>
            <Route path='/user-logout' element={<Logout/>}/>
            <Route path='/student-change-password' element={<StudentChangePassword/>}/> 
            <Route path='/search/:searchstring' element={<Search/>}/>
            <Route path='/user-register' element={<Register/>}/>
            <Route path='/verify-student/:student_id' element={<VerifyStudent/>}/>
            <Route path='/user-dashboard' element={<Dashboard/>}/>
            <Route path='/student-forgot-password' element={<StudentForgotPassword/>}/>
            <Route path='/student-reset-password/:student_id' element={<StudentResetPassword/>}/>
            <Route path='/my-courses' element={<MyCourses/>}/>
            <Route path='/my-account' element={<Account/>}/>
            <Route path='/instructor-change-password' element={<InstructorChangePassword/>}/>
            <Route path='/instructor-login' element={<InstructorLogin/>}/>
            <Route path='/instructor-forgot-password' element={<InstructorForgotPassword/>}/>
            <Route path='/instructor-reset-password/:instructor_id' element={<InstructorResetPassword/>}/>
            <Route path='/instructor-register/' element={<InstructorRegister/>}/>
            <Route path='/verify-instructor/:instructor_id' element={<VerifyInstructor/>}/>
            <Route path='/instructor-dashboard' element={<InstructorDashboard/>}/>
            <Route path='/instructor-account' element={<InstructorAccount/>}/>
            <Route path='/instructor-courses' element={<InstructorMyCourses/>}/>
            <Route path='/instructor-logout' element={<InstructorLogout/>}/>
            <Route path='/add-module/:course_id' element={<AddModule/>}/>
            <Route path='/my-students' element={<MyStudents/>}/>
            <Route path='/add-course' element={<AddCourse />}/>
            <Route path='/edit-course/:course_id' element={<EditCourse />}/>
            <Route path='/instructor-detail/:instructor_id' element={<InstructorDetail />}/>
            <Route path='/all-courses' element={<AllCourses />}/>
            <Route path='/all-modules/:course_id' element={<AllModules />}/>
            <Route path='/edit-module/:module_id' element={<EditModule />}/>
            <Route path='/all-instructors' element={<AllInstructors />}/>
            <Route path='/category/:category_slug' element={<CategoryCourses />}/>
            <Route path='/enrolled-students/:course_id' element={<EnrolledStudents/>}/>
            <Route path='/my-instructors' element={<MyInstructors/>}/>
            <Route path='/add-assignment/:course_id' element={<AddAssignment/>}/>
            <Route path='/view-assignments/:course_id' element={<InstructorAssignments/>}/>
            <Route path='/view-assignment/:assignment_id' element={<ViewEditAssignment/>}/>
            <Route path='/submit-assignment/:assignment_id' element={<SubmitAssignment/>}/>
            <Route path='/grade-assignment/:assignmentResponse_id' element={<GradeSubmission/>}/>
            <Route path='/view-submission/:assignment_id' element={<ViewSubmission/>}/>
    

        </Routes>
        
        <Footer/>
    
    </div>
  );
}

export default Main;
