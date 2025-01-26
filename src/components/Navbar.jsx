import { Link } from "react-router-dom"

export default function Navbar() {
    return <nav className="nav">
        <ul>
            <li>
                <Link to="/" className="site-title">Button Increment/Decrement</Link>
            </li>
            <li>
                <Link to="/movie">Movie Search</Link>
            </li>
            <li>
                <Link to="/Todo">To-do List</Link>
            </li>
        </ul>
    </nav>
}