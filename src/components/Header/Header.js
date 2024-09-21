import { Link } from "react-router-dom";
import "./Header.css";

export const Header = () => {
  return (
    <header>
      <h1>Habit Tracker</h1>
      <ul>
        <li>
          <Link to="/habit-tracking-app-react/">Detail View</Link>
        </li>
        <li>
          <Link to="/habit-tracking-app-react/weekview">Week View</Link>
        </li>
      </ul>
    </header>
  );
};
