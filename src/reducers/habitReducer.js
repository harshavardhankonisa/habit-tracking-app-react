import {
  ADD_HABIT,
  DELETE_HABIT,
  MARK_HABIT_DONE,
  MARK_HABIT_NOT_DONE,
} from "../constants/actionTypes.js";

let id = 1;

const initialState = {
  habits: [],
};

const habitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_HABIT:
      const today = new Date();
      let day = today.getDate() - today.getDay();
      const month = today.getMonth();
      const year = today.getFullYear();

      const newHabit = {
        id: id++,
        name: action.payload,
        weekLog: [
          { id: 0, day: "Sunday", dd: day, mm: month, yyyy: year, isDone: false },
          { id: 1, day: "Monday", dd: day + 1, mm: month, yyyy: year, isDone: false },
          { id: 2, day: "Tuesday", dd: day + 2, mm: month, yyyy: year, isDone: false },
          { id: 3, day: "Wednesday", dd: day + 3, mm: month, yyyy: year, isDone: false },
          { id: 4, day: "Thursday", dd: day + 4, mm: month, yyyy: year, isDone: false },
          { id: 5, day: "Friday", dd: day + 5, mm: month, yyyy: year, isDone: false },
          { id: 6, day: "Saturday", dd: day + 6, mm: month, yyyy: year, isDone: false },
        ],
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
        habits: state.habits.map(habit =>
          habit.id === action.payload ? { ...habit, weekLog: habit.weekLog.map(day => day.id === action.dayId ? { ...day, isDone: true } : day) } : habit
        ),
      };
    case MARK_HABIT_NOT_DONE:
      return {
        ...state,
        habits: state.habits.map(habit =>
          habit.id === action.payload ? { ...habit, weekLog: habit.weekLog.map(day => day.id === action.dayId ? { ...day, isDone: false } : day) } : habit
        ),
      };
    default:
      return state;
  }
};

export default habitReducer;
