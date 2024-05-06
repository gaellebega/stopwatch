import { useState, useEffect, useRef } from "react";

function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const startTimeRef = useRef(0);
  
  useEffect(() => {
    let intervalId = null;

    if (isRunning) {
      intervalId = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }
  
  function formatTime() {
    const hours = String(Math.floor(elapsedTime / (1000 * 60 * 60))).padStart(2, "0");
    const minutes = String(Math.floor((elapsedTime / (1000 * 60)) % 60)).padStart(2, "0");
    const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, "0");
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h6 className=" font-lg font-mono font-bold text-indigo-900">STOP WATCH</h6>
      <div className="flex items-center justify-center w-64 h-64 border-2 border-gray-300 bg-white rounded-full shadow-lg">
        <span className="text-4xl font-bold">{formatTime()}</span>
        </div>
      <div className="mb-12 ">
        <div className="flex justify-center space-x-4">
          <button className="bg-green-500 hover:bg-green-600 px-4 py-2 text-white rounded-md" onClick={start}>Start</button>
          <button className="bg-red-500 hover:bg-red-600 px-4 py-2 text-white rounded-md" onClick={stop}>Stop</button>
          <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 text-white rounded-md" onClick={reset}>Reset</button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
