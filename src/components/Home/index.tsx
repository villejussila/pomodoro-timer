import React from "react";
import "./Home.css";
import Timer from "./Timer";
import CompletedPomodoros from "./CompletedPomodoros";

const Home = () => {
  return (
    <div className="content">
      <Timer />
      <CompletedPomodoros />
    </div>
  );
};

export default Home;
