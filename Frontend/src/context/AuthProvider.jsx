import { createContext, useState, useContext } from "react";
import cookies from "js-cookie";

export const AuthContext = createContext();

const decodeJwt = (token) => {
  try {
    // Manual decoding without library:
    const base64Payload = token.split(".")[1];
    const decodedPayload = atob(base64Payload);
    return JSON.parse(decodedPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const initialUserState = (() => {
    const jwt = cookies.get("jwt");
    const message = localStorage.getItem("message");
    console.log("Decoded JWT:", decodeJwt(cookies.get("jwt")));

    try {
      if (jwt) {
        return decodeJwt(jwt);
      } else if (message) {
        return JSON.parse(message);
      }
      return undefined;
    } catch (error) {
      console.error("Error parsing stored data:", error);
      return undefined;
    }
  })();

  const [authuser, setAuthuser] = useState(initialUserState);

  return (
    <AuthContext.Provider value={{ authuser, setAuthuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
