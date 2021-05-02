import { useAppSelector } from "../../../App/hooks";
import "./ProgressLine.css";

interface Props {
  progress: number;
}

const ProgressLine = ({ progress }: Props) => {
  // const timer = useAppSelector((state) => state.timerReducer);

  //arbitrary numbers to make everything fit
  const progressWidthAdjusted = progress / 5;
  return (
    <div
      className="progress-line"
      style={{
        borderLeft: `${progressWidthAdjusted}vw solid var(--isabelline)`,
      }}
    ></div>
  );
};

export default ProgressLine;
