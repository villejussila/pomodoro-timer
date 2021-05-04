import ReactTooltip from "react-tooltip";
import Settings from "./Settings";
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
