import { createContext } from "react";
import { useContext } from "react";

const NexusContext = createContext({});

const NexusContextProvider = ({ children }) => {
  return <NexusContext.Provider value={{}}>{children}</NexusContext.Provider>;
};

export const useNexusContext = () => {
  return useContext(NexusContext);
};

export { NexusContext, NexusContextProvider };
