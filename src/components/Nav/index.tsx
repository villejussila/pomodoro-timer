import ReactTooltip from "react-tooltip";
import Settings from "./Settings";
import { useAppDispatch, useAppSelector } from "../App/hooks";
import { userUsedTimer, timerInitRequest } from "../../actions/timer";

import "./Nav.css";

const Nav = () => {
  const dispatch = useAppDispatch();
  const { hasUserUsedTimer } = useAppSelector((state) => state.timerReducer);
  function handleClickRefresh() {
    dispatch(timerInitRequest(true));
    dispatch(userUsedTimer(false));
    console.log(`hasUserUsedTimer`, hasUserUsedTimer);
  }
  return (
    <nav className="Nav">
      <ul>
        <li>Pomodoro timer</li>
        <li>
          <button
            data-tip="Reset progress"
            data-delay-show="1000"
            onClick={() => handleClickRefresh()}
            className="refresh-button"
          >
            <i className="fas fa-sync-alt"></i>
            <ReactTooltip />
          </button>
          <Settings />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
