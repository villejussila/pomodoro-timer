import React from "react";
import "./App.css";
import Nav from "../Nav";
import Home from "../Home";
import { useAppSelector } from "./hooks";

function App() {
  const { isStopped } = useAppSelector((state) => state.timerReducer);

  return (
    <div className={isStopped ? "App" : "App color-change-2x"}>
      <Nav />
      <Home />
    </div>
  );
}

export default App;
