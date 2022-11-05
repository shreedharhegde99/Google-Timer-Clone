import style from "./styles/ControlButtons.module.css";

const { ButtonContainer } = style;
export function ControlButtons({ running, changeRunning, resetFunc }) {
  return (
    <div className={ButtonContainer}>
      <div>
        <button onClick={changeRunning}> {running ? "STOP" : "START"}</button>
      </div>
      <div>
        <button onClick={resetFunc}>RESET</button>
      </div>
    </div>
  );
}
