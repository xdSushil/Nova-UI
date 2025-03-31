import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/UserContext"


const ConnectionList = async () => {
  const [ connections, setConnections ] = useState([]);
  const User = useContext(AuthContext)
  console.log("user id", User.user.id)
  
};

export default ConnectionList;