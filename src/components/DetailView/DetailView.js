import "./DetailView.css";
import { addHabit } from "../../actions/habitActions.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function DetailView() {
  const habits = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");

  const handleAddHabit = () => {
    console.log(habits, newHabitName);
    dispatch(addHabit(newHabitName));
    setNewHabitName("");
    setAddUserOpen(false);
  };

  return (
    <div className="DetailView">
      <div>
        <h2>Habits List</h2>
        <ul>
          {habits.map((habit) => (
            <li key={habit.id}>
              <p>{habit.name}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => setAddUserOpen(true)}>Add Habit</button>
      </div>

      {addUserOpen && (
        <div className="popup">
          <div className="popup-content">
            <label>
              Habit Name:
              <input
                type="text"
                value={newHabitName}
                onChange={(e) => setNewHabitName(e.target.value)}
              />
            </label>
            <div>
              <button onClick={handleAddHabit}>Done</button>
              <button
                onClick={() => {
                  setNewHabitName("");
                  setAddUserOpen(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailView;
