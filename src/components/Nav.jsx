import { Link } from "react-router";

const Nav = () => {
    return (
        <nav className="navbar">
            <h1>Patient Registry</h1>
            <div className="links">
                <Link to="/patients">Home</Link>
                <Link to="/register">Register</Link>
            </div>
        </nav>
    );
}

export default Nav;