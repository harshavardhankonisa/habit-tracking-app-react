import { ADD_HABIT, DELETE_HABIT,MARK_HABIT_DONE, MARK_HABIT_NOT_DONE } from '../constants/actionTypes';

export const addHabit = (habit) => ({
  type: ADD_HABIT,
  payload: habit,
});

export const deleteHabit = (habitId) => ({
  type: DELETE_HABIT,
  payload: habitId
})

export const markDone = (habitId) => ({
  type: MARK_HABIT_DONE,
  payload: habitId,
});

export const markNotDone = (habitId) => ({
  type: MARK_HABIT_NOT_DONE,
  payload: habitId,
});
