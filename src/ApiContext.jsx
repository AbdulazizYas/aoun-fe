import { createContext, useState } from 'react';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [apiType, setApiType] = useState('rest'); // Default value can be 'rest' or 'graphql'

  return (
    <ApiContext.Provider value={{ apiType, setApiType }}>
      {children}
    </ApiContext.Provider>
  );
};