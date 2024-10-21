import React from 'react';
import Emojis from './Emojis.jsx'; // Capitalize the component name

const App = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-blue-500 w-full">
      <Emojis /> {/* Use the capitalized component */}
    </div>
  );
}

export default App;
