import {
  ADD_HABIT,
  DELETE_HABIT,
  MARK_HABIT_DONE,
  MARK_HABIT_NOT_DONE,
} from "../constants/actionTypes.js";

let id = 1;

const initialState = {
  habits: [
    {
      id: 100,
      name: "Swimming",
      done: ["21/3/2024", "22/3/2024"],
      not_done: [],
      dateAdded: "21/3/2024",
    },
    {
      id: 101,
      name: "Gym",
      done: ["22/3/2024"],
      not_done: ["21/3/2024"],
      dateAdded: "21/3/2024",
    },
    {
      id: 102,
      name: "Hockey",
      done: ["22/3/2024"],
      not_done: ["20/3/2024"],
      dateAdded: "21/3/2024",
    },
  ],
};

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HABIT:
      const today = new Date();
      const date = today.getDate();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const newHabit = {
        id: id++,
        name: action.payload,
        done: [],
        not_done: [],
        dateAdded: `${date}/${month}/${year}`,
      };
      return {
        ...state,
        habits: [...state.habits, newHabit],
      };
    case DELETE_HABIT:
      return {
        ...state,
        habits: state.habits.filter((habit) => habit.id !== action.payload),
      };
    case MARK_HABIT_DONE:
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.habitId
            ? {
                ...habit,
                done: [...habit.done, action.payload.day],
                not_done: habit.not_done.filter(
                  (date) => date !== action.payload.day
                ), // Remove from not_done if exists
              }
            : habit
        ),
      };
    case MARK_HABIT_NOT_DONE:
      return {
        ...state,
        habits: state.habits.map((habit) =>
          habit.id === action.payload.habitId
            ? {
                ...habit,
                not_done: [...habit.not_done, action.payload.day],
                done: habit.done.filter((date) => date !== action.payload.day), // Remove from done if exists
              }
            : habit
        ),
      };
    default:
      return state;
  }
};

export default habitReducer;
