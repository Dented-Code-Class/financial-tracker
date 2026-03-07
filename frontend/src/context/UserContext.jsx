import { createContext, useContext, useState } from "react";

// 1. create context
export const UserContext = createContext();

// 2. provider
export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// 3. create a function to use the context
export const useUser = () => useContext(UserContext);
