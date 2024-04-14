"use client";
import { Flex } from "@radix-ui/themes";
import { useContext } from "react";
import { ThemeContext } from "./DarkModeContext";
import DarkModeTrigger from "./DarkModeTrigger";

const NavBar = () => {
  const context = useContext(ThemeContext);
  const { switchDark, switchLight, theme } = context ?? {};
  return (
    <nav
      className="mb-5 py-3"
      style={
        theme === "dark" ? { background: "#1d211c" } : { background: "white" }
      }
    >
      <Flex justify="end">
        <DarkModeTrigger />
      </Flex>
    </nav>
  );
};

export default NavBar;
