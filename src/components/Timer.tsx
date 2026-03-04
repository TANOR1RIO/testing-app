import styled from "@emotion/styled";
import { useEffect, useMemo, useState } from "react";
const TimerBox = styled.div<{ danger: boolean }>`
  border-radius: 10px;
  padding: 10px 62.5px;
  height: 132px;
  border: 1px solid ${(p) => (p.danger ? "#ffd7d7" : "blue")};

  .timer__title {
    color: ${(p) => (p.danger ? "#df0000" : "blue")};
    font-weight: 400;
    font-size: 16px;
    line-height: 1;
    margin-bottom: 10px;
    text-align: center;
  }
  .timer__duration {
    color: ${(p) => (p.danger ? "#df0000" : "blue")};
    font-weight: 700;
    font-size: 66px;
    line-height: 1;
    text-align: center;
  }
`;

type TimerProps = {
    durationSec?: number | undefined;
    onFinish: () => void;
}

export function Timer(props: TimerProps) {
  const { durationSec, onFinish } = props;
  const [timeLeft, setTimeLeft] = useState<number>(durationSec);
  const [finished, setFinished] = useState(false);
  useEffect(() => {
    if(finished) return
    const intervalId = setInterval(function () {
      setTimeLeft(t => {
        if (t < 1) {
          clearInterval(intervalId);
          setFinished(true)
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [finished]);

  useEffect(()=>{
    if(!finished) return;
    onFinish()
  },[finished, onFinish])
  const danger = timeLeft <= durationSec / 4;

  const formatTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    const formattedSecs = secs < 10 ? `0${secs}` : secs;
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    return `${formattedMins}:${formattedSecs}`;
  }, [timeLeft]);
  return (
    <TimerBox danger={danger}>
      <h3 className="timer__title">Осталось времени</h3>
      <div className="timer__duration">{formatTime}</div>
    </TimerBox>
  );
}