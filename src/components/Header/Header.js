import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="Header">
      <h1>Habit Tracker</h1>
      <ul>
        <li><Link to="/">Detail View</Link></li>
        <li><Link to="/weekview">Week View</Link></li>
      </ul>
    </div>
  );
};

export default Header;
