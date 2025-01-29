// ToggleSwitch.js
import React from "react";
import { motion } from "framer-motion";

const ConnectionSwitch = ({ switchState, handleSwitchClick, getSwitchStyle }) => {
  return (
    <div sx={{ position: "absolute", bottom: 8, right: 8 }}>
      <label sx={{ marginBottom: 1, fontSize: "14px", fontWeight: "600", textAlign: "center" }}>
        {switchState === "stranger" && "Stranger"}
        {switchState === "pending" && "Pending Request"}
        {switchState === "connected" && "Connection Established"}
      </label>

      <motion.div
        sx={{
          width: 96,
          height: 32,
          borderRadius: "9999px",
          display: "flex",
          alignItems: "center",
          backgroundColor: getSwitchStyle(),
          padding: 2,
          position: "relative",
        }}
        layout
        transition={{ type: "spring", stiffness: 200 }}
      >
        <motion.div
          sx={{
            width: 24,
            height: 24,
            backgroundColor: "white",
            borderRadius: "50%",
            boxShadow: 6,
            cursor: "pointer",
            position: "absolute",
          }}
          layout
          onClick={handleSwitchClick}
          initial={false}
          animate={{
            x: switchState === "stranger" ? 0 : switchState === "pending" ? 28 : 56,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        ></motion.div>
      </motion.div>
    </div>
  );
};

export default ConnectionSwitch;
