import { Link } from "react-router-dom";

function CategoryCourses(){
    return (
        <div className="container mt-4">
        <h3 className = "pb-3 my-1 mt-5"> Related courses </h3>
        <div className = "row mb-5">
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
            <div className = "col-md-3 mb-4">
                <div className="card">
                    <a href = "#"> <img src="/logo512.png" className="card-img-top img-thumbnail" alt="..."/></a>
                    <div className="card-body">
                        <Link to = "/"> <h5 className="card-title">Getting started with React JS</h5> </Link>
                    </div>
                </div>
            </div>
        </div>
            {/* For pagination */}
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li className="page-item">
                    <Link className="page-link" to="/" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </Link>
                    </li>
                    <li className="page-item"><Link className="page-link" to="/">1</Link></li>
                    <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                    <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                    <li className="page-item">
                    <Link className="page-link" to="/" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default CategoryCourses;