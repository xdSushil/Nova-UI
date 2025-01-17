import Sidebar from "./Components/Sidebar/Sidebar";

import ProfilePic from "./Components/profilePic/Profilepic";
import './App.css';
// import Feed from './Pages/Feed/Feed';
import FeedHeader from "./Components/FeedHeader/FeedHeader";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home"
import Messages from "./Components/Messages/Messages";
import Analytics from "./Components/Analytics/Analytics";
import Estore from "./Components/Estore/Estore";
import Settings from "./Components/Settings/Settings";
import Network from "./Components/Network/Network";

function App() {
  return (
    <div>
      <FeedHeader />
      <Sidebar />
      <ProfilePic />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/chats" element={<Messages />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Store" element={<Estore />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Network" element={<Network />} />
      </Routes>
    </div>
  );
}

export default App;
