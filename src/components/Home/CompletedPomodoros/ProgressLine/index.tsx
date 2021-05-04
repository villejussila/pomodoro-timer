import "./ProgressLine.css";

interface Props {
  progress: number;
}

const ProgressLine = ({ progress }: Props) => {
  //dividing by 5 seems to work ok to fill one progress bar
  const progressWidthAdjusted = progress / 5;
  return (
    // <div
    //   className="test"
    //   style={{ width: "25%", backgroundColor: "white", height: "4px" }}
    // >
    <div
      className="progress-line"
      style={{
        borderLeft: `${progressWidthAdjusted}vw solid var(--isabelline)`,
      }}
    ></div>
    // </div>
  );
};

export default ProgressLine;
