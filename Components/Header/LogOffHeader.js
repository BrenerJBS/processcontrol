import React from "react";
import { NavLink } from "react-router-dom";

const LogOffHeader = () => {
  return (
    <>
      <NavLink activeStyle={{ color: "tomato" }} to="/" end>
        Home
      </NavLink>
      <NavLink activeStyle={{ color: "tomato" }} to="login">
        Entrar
      </NavLink>
    </>
  );
};

export default LogOffHeader;
