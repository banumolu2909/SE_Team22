import { Link } from "react-router-dom";
import myLogo from '../icons8-student-center-30.png';

function Footer() {

    const footerstyle = {
      //position: 'fixed',
      bottom: '0',
      width: '100%',
      color: "#990000"
    }

    return (
        <footer style={footerstyle} className="border-top mt-5 bg-light">
        <div className="container py-5">
          <p className="float-end">
            <Link to ="/">Back to top</Link><br/>
            <small>Contact us: <Link to='https://mail.google.com/mail/u/0/#inbox?compose=new'>crimsonboardcom@gmail.com</Link></small>
          </p>
          <p className="mb-1 fw-bold fs-3">
          <img src={myLogo} to="/" alt="Logo" width="30" height="30" className="align-text-top mx-1" />
                Crimson Board
          </p>
          <p className = "mb-1 fs-5">
          Expanding your knowledge, one course at a time
          </p>
          <small>Crimson Board Copyright © 2023 IUB. All rights reserved.</small>
        </div>
      </footer>
    );
  }
  
  export default Footer;
  