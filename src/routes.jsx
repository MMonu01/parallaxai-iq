import { Routes, Route } from "react-router-dom";
import loadable from "@loadable/component";

const ChatScreen = loadable(() => import("~/screens/chat-screen"));

const AppRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<ChatScreen />} />
    </Routes>
  );
};

export default AppRoute;
