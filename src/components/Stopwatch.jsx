import { Fragment, useEffect, useRef, useState } from "react";
import { ControlButtons } from "./ControlButtons";
import style from "./styles/Stopwatch.module.css";
const { TimeContainer } = style;

function getTime(time) {
  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  return { seconds, minutes };
}

export function Stopwatch() {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [millseconds, setMillSeconds] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const watchRef = useRef(null);
  const millsecondsRef = useRef(null);

  function startWatch() {
    if (!watchRef.current && !millsecondsRef.current) {
      setRunning(true);
      watchRef.current = setInterval(() => setTime((prev) => prev + 1), 1000);
      millsecondsRef.current = setInterval(
        () =>
          setMillSeconds((prev) => {
            if (prev === 99) console.log(prev);
            return prev === 99 ? 0 : prev + 1;
          }),
        10
      );
    } else {
      setRunning(false);

      clearInterval(watchRef.current);
      clearInterval(millsecondsRef.current);
      watchRef.current = null;
      millsecondsRef.current = null;
    }
  }

  useEffect(() => {
    const { seconds, minutes } = getTime(time);
    setSeconds(seconds);
    setMinutes(minutes);
  }, [time]);

  useEffect(() => {
    return () => {
      clearInterval(watchRef.current);
      clearInterval(millsecondsRef.current);
      watchRef.current = null;
      millsecondsRef.current = null;
      setTime(0);
      setMillSeconds(0);
      setRunning(false);
    };
  }, []);

  function resetWatch() {
    clearInterval(watchRef.current);
    clearInterval(millsecondsRef.current);
    watchRef.current = null;
    millsecondsRef.current = null;
    setTime(0);
    setMillSeconds(0);
    setRunning(false);
  }

  return (
    <div>
      <div className={TimeContainer}>
        <div>
          {minutes > 0 && (
            <Fragment>
              <span>{minutes}</span>
              <span>m </span>
            </Fragment>
          )}
        </div>
        <div>
          <span>
            {minutes > 0 ? (seconds > 9 ? seconds : `0${seconds}`) : seconds}
          </span>
          <span>s </span>
        </div>
        <div>
          <h2>{millseconds}</h2>
        </div>
      </div>

      <ControlButtons
        running={running}
        changeRunning={startWatch}
        resetFunc={resetWatch}
      />
    </div>
  );
}
