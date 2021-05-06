import "./App.css";
import Nav from "../Nav";
import Home from "../Home";
import { useAppSelector } from "./hooks";

function App() {
  const { isStopped, isShowTimer } = useAppSelector(
    (state) => state.timerReducer
  );
  const { staticBackground } = useAppSelector((state) => state.settingsReducer);


  return (
    <div
      className={
        !isStopped && !staticBackground && isShowTimer
          ? "App color-change-2x"
          : "App"
      }
    >
      <Nav />
      <Home />
    </div>
  );
}

export default App;
