import Left from "./home/left/left";
import Right from "./home/right/right";
import Logout from "./home/left1/logout";
import Signup from "./components/signup";
import Login from "./components/login";
import { useAuth } from "./context/AuthProvider";

import { Routes, Route, Navigate } from "react-router-dom";

import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const { authuser } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authuser ? (
              <div className="flex h-screen">
                <Logout />
                <Left />
                <Right />
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authuser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authuser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>

      <Toaster />
    </>
  );
};

export default App;
