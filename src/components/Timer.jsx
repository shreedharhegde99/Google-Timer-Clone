import { Fragment, useEffect, useRef, useState } from "react";
import { ControlButtons } from "./ControlButtons";

import style from "./styles/Timer.module.css";

const { TimerInputContainer, TimeContainer, Progressbar } = style;

export function Timer() {
  const [time, setTime] = useState("");
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [minute, setMinute] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [progressing, setProgressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  function getTime(time) {
    const minute = Math.floor(time / 60);
    const seconds = time % 60;

    return { minute, seconds };
  }

  function toggleStart() {
    if (!progressing) {
      setProgress(Number(time));
      setProgressing(true);
    }

    if (time === "" || !time) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setRunning(false);
      return;
    }
    setRunning(true);
    setStarted(true);

    timerRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          // setTime(0);
          setRunning(false);
          setStarted(false);
          setProgress(0);
          setProgressing(false);
          return "";
        }

        return prev - 1;
      });
    }, 1000);
  }

  function resetTimer() {
    clearInterval(timerRef.current);
    timerRef.current = null;
    setTime("");
    setStarted(false);
    setRunning(false);
    setProgress(0);
    setProgressing(false);
  }

  useEffect(() => {
    const { minute, seconds } = getTime(time);
    setMinute(minute);
    setSeconds(seconds);
  }, [time]);

  useEffect(() => {
    return clearInterval(timerRef);
  }, []);

  return (
    <div>
      <div>
        {!started ? (
          <div className={TimerInputContainer}>
            <input
              type="text"
              value={time?.toString()}
              onChange={(e) =>
                isNaN(e.target.value) ? null : setTime(Number(e.target.value))
              }
              placeholder="00 s"
            />
          </div>
        ) : (
          <Fragment>
            <div className={TimeContainer}>
              <div>
                {minute ? (
                  <Fragment>
                    <span>{minute} </span>
                    <span>m</span>
                  </Fragment>
                ) : (
                  ""
                )}
              </div>
              <div>
                {
                  <Fragment>
                    <span>
                      {seconds && seconds > 9 ? seconds : `0${seconds}`}{" "}
                    </span>
                    <span>s</span>
                  </Fragment>
                }
              </div>
            </div>
            <div>
              <progress
                max={progress}
                value={progress - time}
                className={Progressbar}
              />
            </div>
          </Fragment>
        )}
      </div>
      <ControlButtons
        running={running}
        changeRunning={toggleStart}
        resetFunc={resetTimer}
      />
    </div>
  );
}
