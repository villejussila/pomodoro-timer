import ReactTooltip from "react-tooltip";

import { useAppDispatch } from "../App/hooks";
import { timerInitRequest } from "../../actions/timer";

import "./Nav.css";

const Nav = () => {
  const dispatch = useAppDispatch();

  function handleClickRefresh() {
    dispatch(timerInitRequest(true));
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
            <ReactTooltip />
            <i className="fas fa-sync-alt"></i>
          </button>
          <button
            data-tip="Settings"
            data-delay-show="1000"
            className="settings-button"
          >
            <i className="fas fa-cog"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
