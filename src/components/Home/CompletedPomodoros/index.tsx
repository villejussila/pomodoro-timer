import React from "react";
import "./CompletedPomodoros.css";

const CompletedPomodoros = () => {
  return (
    <div className="completed-pomodoros">
      <div className="completed-title">Completed</div>
      <div className="pomodoro-list">
        <div className="pomodoro pomodoro-line"></div>
        <div className="pomodoro"></div>
        <div className="pomodoro"></div>
        <div className="pomodoro"></div>
      </div>
    </div>
  );
};

export default CompletedPomodoros;
