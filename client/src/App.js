import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import io from "socket.io-client";

import Index from "./pages/Index";
import Authentication from "./pages/authentication/Authentication";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/404";

// 🔴 Render backend socket URL
const SOCKET_URL = "https://chatboard-zewg.onrender.com";

const App = () => {
  const [socket, setSocket] = React.useState(null);

  const setupSocket = () => {
    const token = localStorage.getItem("CC_Token");

    if (token && !socket) {
      const newSocket = io(SOCKET_URL, {
        transports: ["websocket"],
        auth: {
          token: token,   // backend will read this
        },
      });

      newSocket.on("connect", () => {
        console.log("✅ Socket connected:", newSocket.id);
      });

      newSocket.on("disconnect", () => {
        console.log("❌ Socket disconnected");
        setSocket(null);
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connect_error", (err) => {
        console.error("🔥 Socket connection error:", err.message);
      });

      setSocket(newSocket);
    }
  };

  React.useEffect(() => {
    setupSocket();
    // eslint-disable-next-line
  }, []);

  const ProtectedRoute = ({ component: Component, ...rest }) => {
    const token = localStorage.getItem("CC_Token");
    return (
      <Route
        {...rest}
        render={(props) =>
          token ? (
            <Component socket={socket} />
          ) : (
            <Redirect
              to={{ pathname: "/auth", state: { from: props.location } }}
            />
          )
        }
      />
    );
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Index} />
        <Route
          exact
          path="/auth"
          render={() => <Authentication setupSocket={setupSocket} />}
        />
        <ProtectedRoute
          exact
          path={["/dashboard", "/channel/:id"]}
          component={Dashboard}
        />
        <Route path="" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
