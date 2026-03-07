import { createContext, useContext, useState } from "react";

// 1. create context
export const UserContext = createContext();

// 2. provider
export const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const fetchUserDetail = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      const response = await fetch(
        import.meta.env.VITE_ROOT_URL + "/api/v1/users",
        {
          method: "GET",
          headers: {
            authorization: token,
          },
        },
      );

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
      }
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUserDetail,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

// 3. create a function to use the context
export const useUser = () => useContext(UserContext);
