import "./DetailView.css";
import Layout from "../Layout.js";
import { addHabit, deleteHabit } from "../../actions/habitActions.js";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function DetailView() {
  const habits = useSelector((state) => state.habits);
  const dispatch = useDispatch();

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState("");

  const handleAddHabit = () => {
    if (newHabitName.length !== 0) {
      dispatch(addHabit(newHabitName));
    }
    setNewHabitName("");
    setAddUserOpen(false);
  };

  const handleDeleteHabit = (id) => {
    dispatch(deleteHabit(id));
  };

  return (
    <Layout>
      <div className="DetailView">
        <h2>Detail View</h2>
        <div>
          <h2>Habits List</h2>
          <ul className="habitsList">
            {habits.map((habit) => (
              <li key={habit.id} className="habitOne">
                <p>{habit.name}</p>
                <button onClick={()=>{handleDeleteHabit(habit.id)}}>Delete</button>
              </li>
            ))}
          </ul>
          <div className="addHabitDiv">
            <button onClick={() => setAddUserOpen(true)}>Add Habit</button>
          </div>
        </div>

        {addUserOpen && (
          <div className="popup">
            <div className="popup-content">
              <label>
                Add Habit Name:
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
    </Layout>
  );
}

export default DetailView;
