import ReactTooltip from "react-tooltip";
import Settings from "./Settings";
import { useAppDispatch } from "../App/hooks";
import { userUsedTimer, timerInitRequest } from "../../actions/timer";

import "./Nav.css";
import { useEffect, useState } from "react";

const Nav = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);
  const dispatch = useAppDispatch();
  function handleClickRefresh() {
    dispatch(timerInitRequest(true));
    dispatch(userUsedTimer(false));
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
            <ReactTooltip disable={isMobile} />
          </button>
          <Settings />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
