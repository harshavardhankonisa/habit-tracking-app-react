import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <h1>Habit Tracker</h1>
      <ul>
        <li>
          <Link to="/">Detail View</Link>
        </li>
        <li>
          <Link to="/weekview">Week View</Link>
        </li>
      </ul>
    </header>
  );
};
