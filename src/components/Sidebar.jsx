import{ Link }from "react-router-dom";
function Sidebar() {
    return(
        <aside className="Sidebar">
            <h3 style={{color: "red"}}>JOB TRACK</h3>
            <nav>
                <p>
                    <Link className="nav-link" to="/dashboard">
                        📊Dashboard
                    </Link>
                </p>
                <p>
                    <Link className="nav-link" to="/application">
                        📄application
                    </Link>
                </p>
                <p>
                    <Link className="nav-link" to="/add-job">
                        ➕add job
                    </Link>
                </p>
                <p>
                    <Link className="nav-link" to="/setting">
                        ⚙️setting
                    </Link>
                </p>
            </nav>     
        </aside>
    )
}
export default Sidebar