import React, { useState, useEffect, useCallback } from "react";
import "./WeekView.css";
import Layout from "../Layout";
import { useSelector, useDispatch } from "react-redux";
import { markDone, markNotDone } from "../../actions/habitActions";

function WeekView() {
  const habits = useSelector((state) => state.habits);
  const dispatch = useDispatch();
  const [selectedYear] = useState(getCurrentYear());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Memoize getCurrentWeek using useCallback
  const getCurrentWeek = useCallback(() => {
    const today = selectedDate;
    const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
    const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  }, [selectedDate]);

  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, [selectedDate, getCurrentWeek]);

  // Function to get the current year
  function getCurrentYear() {
    return new Date().getFullYear();
  }

  // Function to handle changing the selected date
  const handleDateChange = (event) => {
    setSelectedDate(new Date(event.target.value));
  };

  // Function to navigate to past week
  const goToPastWeek = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() - 7)));
  };

  // Function to navigate to upcoming week
  const goToNextWeek = () => {
    setSelectedDate(new Date(selectedDate.setDate(selectedDate.getDate() + 7)));
  };

  // Function to get the days of the selected week
  const getDaysOfWeek = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const firstDayOfYear = new Date(selectedYear, 0, 1);
    const firstDayOfWeek = new Date(
      selectedYear,
      0,
      (currentWeek - 1) * 7 + 1 - firstDayOfYear.getDay()
    );

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeek);
      currentDate.setDate(firstDayOfWeek.getDate() + i);
      daysOfWeek.push({
        day: days[currentDate.getDay()],
        date: currentDate.getDate(),
        month: currentDate.getMonth() + 1,
      });
    }
    return daysOfWeek;
  };

  const handleMarkDone = ({ habitId, day }) => {
    dispatch(markDone({ habitId, day }));
  };

  const handleMarkNotDone = ({ habitId, day }) => {
    dispatch(markNotDone({ habitId, day }));
  };

  // Render a full day's schedule for a habit
  const renderDaySchedule = (habit) => {
    const done = habits.find((item) => item.name === habit.name)?.done || [];
    const not_done =
      habits.find((item) => item.name === habit.name)?.not_done || [];
    const daysOfWeek = getDaysOfWeek();
    return daysOfWeek.map((day, index) => {
      const isDone = Object.values(done).includes(
        `${day.date}/${day.month}/${selectedDate.getFullYear()}`
      );
      const isNotDone = Object.values(not_done).includes(
        `${day.date}/${day.month}/${selectedDate.getFullYear()}`
      );
      return (
        <button
          key={index}
          className="tile"
          style={{
            backgroundColor: `${isDone ? "red" : isNotDone ? "green" : ""}`,
          }}
          onClick={() => {
            const selDay = `${day.date}/${
              day.month
            }/${selectedDate.getFullYear()}`;
            const currentDate = new Date();
            const end = `${currentDate.getDate()}/${
              currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`;
            const dayOfWeek = currentDate.getDay();
            const daysUntilSunday = dayOfWeek % 7;
            const lastSaturday = new Date(currentDate);
            lastSaturday.setDate(currentDate.getDate() - daysUntilSunday);
            const start = `${lastSaturday.getDate()}/${
              lastSaturday.getMonth() + 1
            }/${lastSaturday.getFullYear()}`;

            if (start > selDay || selDay > end) return;

            if (isDone && !isNotDone) {
              handleMarkNotDone({
                habitId: habit.id,
                day: selDay,
              });
            } else if (isNotDone && !isDone) {
              handleMarkDone({
                habitId: habit.id,
                day: selDay,
              });
            } else if (!isDone && !isNotDone) {
              handleMarkNotDone({
                habitId: habit.id,
                day: selDay,
              });
            }
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <p>{day.day}</p>
            <p>
              ({day.date}/{day.month}/{selectedDate.getFullYear()})
            </p>
          </div>
        </button>
      );
    });
  };

  return (
    <Layout>
      <div className="WeekView">
        <h2>WeekView</h2>
        <div className="MainView">
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={handleDateChange}
          />
        </div>
        <div className="week-navigation">
          <button onClick={goToPastWeek}>Previous Week</button>
          <span>
            Week {currentWeek}, {selectedDate.getFullYear()}
          </span>
          <button onClick={goToNextWeek}>Next Week</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button style={{ backgroundColor: "green", margin: "10px" }}>
            Mark Done
          </button>
          <button style={{ backgroundColor: "red", margin: 1 }}>
            Mark Not Done
          </button>
        </div>
        <ul>
          {habits.map((habit) => (
            <li key={habit.id} style={{listStyle: "none"}}>
              <p style={{padding: "10px 0px"}}>{habit.name}</p>
              <div className="grid-container">{renderDaySchedule(habit)}</div>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export default WeekView;
