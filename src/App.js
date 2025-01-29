
import './App.css';
// import Feed from './Pages/Feed/Feed';

import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home/Home"
import Messages from "./Components/Messages/Messages";
import Analytics from "./Components/Analytics/Analytics";
import Estore from "./Components/Estore/Estore";
import Settings from "./Components/Settings/Settings";
import Network from "./Components/Network/Network";
import Register from "./Pages/RegisterPage/RegisterPage";
import LoginPage from './Pages/LoginPage/LoginPage';
import InfoPage from './Pages/InfoPage/InfoPage';


function App() {
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
