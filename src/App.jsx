import { useState } from "react";
import "./App.css";
import { Stopwatch } from "./components/Stopwatch";
import { Timer } from "./components/Timer";

function App() {
  const [timerVisible, setTimerVisble] = useState(true);
  return (
    <div className="App">
      <div className="TitleContainer">
        <div
          style={{
            color: timerVisible ? "blue" : "inherit",
            borderBottom: timerVisible ? " 2px solid blue" : "inherit",
          }}
          onClick={() => setTimerVisble(true)}
        >
          <p>TIMER</p>
        </div>
        <div
          style={{
            color: timerVisible ? "inherit" : "blue",
            borderBottom: timerVisible ? "inherit" : " 2px solid blue",
          }}
          onClick={() => setTimerVisble(false)}
        >
          <p>STOPWATCH</p>
        </div>
      </div>
      <div>{!timerVisible ? <Stopwatch /> : <Timer />}</div>
    </div>
  );
}

export default App;
