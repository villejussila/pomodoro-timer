import React, { useEffect } from "react";
import "./Home.css";
import Timer from "./Timer";
import CompletedPomodoros from "./CompletedPomodoros";

import { useAppSelector, useAppDispatch } from "../App/hooks";
import { timerInitRequest, showTimer } from "../../actions/timer";

const Home = () => {
  const { hasUserUsedTimer, isShowTimer } = useAppSelector(
    (state) => state.timerReducer
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (hasUserUsedTimer) {
      dispatch(showTimer(false));
      return;
    }
    dispatch(showTimer(true));
    //eslint-disable-next-line
  }, []);

  function handleContinue() {
    dispatch(showTimer(true));
  }
  function handleRestart() {
    dispatch(timerInitRequest(true));
    dispatch(showTimer(true));
  }
  return (
    <div className="content">
      {isShowTimer ? (
        <>
          <CompletedPomodoros />
          <Timer />
        </>
      ) : (
        <div className="user-interaction">
          <button
            className="continue-session-button session-btn"
            onClick={handleContinue}
          >
            Continue session
          </button>
          <button
            className="start-new-session session-btn"
            onClick={handleRestart}
          >
            New session
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
