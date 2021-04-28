import React from "react";
import "./Home.css";
import Timer from "./Timer";
import CompletedPomodoros from "./CompletedPomodoros";

const Home = () => {
  return (
    <div className="content">
      <CompletedPomodoros />
      <Timer />
    </div>
  );
};

export default Home;
