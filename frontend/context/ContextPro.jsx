"use client";
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const contextAPI = createContext();

const ContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(false);
  const [userId, setUserId] = useState();

  const verifyUser = async () => {
    console.log("Verifying user...");
    try {
      const response = await axios.get("http://localhost:5000/verifyuser", {
        withCredentials: true, // To send cookies with the request
      });
      console.log(response.data);
      if (response.data.message === "verified") {
        setUserData(true);
        console.log(response.data.id);
        setUserId(response.data.id); // Store the user ID for further use in other components.
      } else {
        setUserData(false);
      }
    } catch (error) {
      setUserData(false);
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("Component mounted, verifying user...");
    verifyUser(); // This will be called when the component mounts
  }, []);

  return (
    <contextAPI.Provider
      value={{
        userId,
        userData,
        verifyUser, // Pass the function reference, not the result of the call
      }}
    >
      {children}
    </contextAPI.Provider>
  );
};

export default ContextProvider;
