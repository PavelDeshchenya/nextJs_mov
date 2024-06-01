import React, { createContext, useState, useContext } from "react";

const DisplayContext = createContext();

export const DisplayProvider = ({ children }) => {
  const [displayedValue, setDisplayedValue] = useState(null);

  return (
    <DisplayContext.Provider value={{ displayedValue, setDisplayedValue }}>
      {children}
    </DisplayContext.Provider>
  );
};

export const useDisplay = () => useContext(DisplayContext);
