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

      const habit = {
        id: id++,
        name: action.payload,
        weekLog: [
          {
            id: 0,
            day: "Sunday",
            dd: day,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 1,
            day: "Monday",
            dd: day + 1,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 2,
            day: "Tuesday",
            dd: day + 2,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 3,
            day: "Wednesday",
            dd: day + 3,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 4,
            day: "Thursday",
            dd: day + 4,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 5,
            day: "Friday",
            dd: day + 5,
            mm: month,
            yyyy: year,
            isDone: "",
          },
          {
            id: 6,
            day: "Saturday",
            dd: day + 6,
            mm: month,
            yyyy: year,
            isDone: "",
          },
        ],
      };
      const addHabits = [...state, habit];
      return addHabits;
    case DELETE_HABIT:
      const deleteHabits = state.filter((habit) => habit.id !== action.payload);
      return deleteHabits;
    case MARK_HABIT_DONE:
      return state;
    case MARK_HABIT_NOT_DONE:
      return state;
    default:
      return state;
  }
};

export default habitReducer;
