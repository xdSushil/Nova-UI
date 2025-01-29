import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Components/Home/Home";
import Messages from "./Components/Messages/Messages";
import Analytics from "./Components/Analytics/Analytics";
import Estore from "./Components/Estore/Estore";
import Settings from "./Components/Settings/Settings";
import Network from "./Components/Network/Network";
import Register from "./Pages/RegisterPage/RegisterPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import Loading from "./Components/loading/loading"; // Assuming you have a Loading component

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  if (loading) {
    return <Loading />; // Show the loading screen
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/chats" element={<Messages />} />
        <Route path="/Analytics" element={<Analytics />} />
        <Route path="/Store" element={<Estore />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/details" element={<InfoPage />} />
      </Routes>
    </div>
  );
}

export default App;
