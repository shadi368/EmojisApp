import React, { useEffect, useState } from 'react';

const Emojis = () => {
  const [progress, setProgress] = useState(0);
  const [emoji, setEmoji] = useState('😀');
  const [isDone, setIsDone] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // State to control visibility of the emoji display
  const [isPlusVisible, setIsPlusVisible] = useState(false); // State to control visibility of the plus button

  const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊'];

  useEffect(() => {
    let intervalId;

    if (isVisible && !isDone) { // Check visibility before starting the interval
      // Progress bar and emoji change
      intervalId = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 2; // Fills in 50 seconds
          } else {
            clearInterval(intervalId);
            setIsDone(true); // Switch to done state
            return prev;
          }
        });

        // Change emoji every second
        setEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isVisible, isDone, emojis]);

  const handleContinue = () => {
    // Reset states to restart the game
    setProgress(0);
    setIsDone(false);
    setEmoji('😀'); // Reset emoji to initial state
  };

  const handleClose = () => {
    setIsVisible(false); // Hide the emoji display
    setIsPlusVisible(true); // Show the plus button
  };

  const handleShow = () => {
    setIsVisible(true); // Show the emoji display again
    setIsPlusVisible(false); // Hide the plus button
  };

  return (
    <div className="relative">
      {isVisible ? (
        <div className="w-80 h-64 bg-white rounded-lg shadow-lg p-6 text-center">
          <div className="flex justify-end">
            <button
              className="text-gray-600 text-xl cursor-pointer"
              onClick={handleClose} // Call handleClose to hide the div
            >
              X
            </button>
          </div>
          <div className="mt-4">
            {isDone ? (
              <>
                <div className="text-5xl">✅</div>
                <p className="text-lg mt-4">Done!</p>
              </>
            ) : (
              <>
                <div className="text-5xl">{emoji}</div>
                <p className="text-lg mt-4">Processing...</p>
                <div className="w-full h-2 bg-gray-200 rounded mt-4">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Remaining: {Math.max(0, 50 - Math.round(progress / 2))} seconds
                </p>
              </>
            )}
          </div>
          <button
            className={`mt-6 px-4 py-2 bg-green-500 text-white rounded-lg ${
              !isDone ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={handleContinue} // Add onClick to handle restart
            disabled={!isDone}
          >
            Continue
          </button>
        </div>
      ) : (
        // Render the plus button when the emoji display is hidden
        isPlusVisible && (
          <button
            className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={handleShow} // Show the emoji display again
          >
            +
          </button>
        )
      )}
    </div>
  );
};

export default Emojis;
