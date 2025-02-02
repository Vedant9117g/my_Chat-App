import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import io from "socket.io-client";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import { ThemeProvider } from "./components/ThemeProvider";
import { AuthenticatedUser } from "./components/ProtectedRoutes";
import { setOnlineUsers } from "./features/authSlice";
import { setSocket } from "./features/socketSlice";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "login", element: <AuthenticatedUser><Login /></AuthenticatedUser> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

function App() {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const socketio = io("http://localhost:8080", {
        query: { userId: user._id },
      });

      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers))
      });

      return () => {
        socketio.disconnect();
      };
    }
  }, [user]);

  return (
    <main>
      <ThemeProvider>
        <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
