import React, { useState, useEffect } from "react";

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div>
      <h3>Time Elapsed: {seconds} seconds</h3>
      {/* button to increase seonds */}
      <button onClick={() => setSeconds((prev) => prev - 1)}>Increase</button>
    </div>
  );
}

export default Timer;
