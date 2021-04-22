import React from "react";
import Rotas from "./rotas";
import { UserStore } from "./UserContext";

const App = () => {
  return (
    <UserStore>
      <Rotas />
    </UserStore>
  );
};

export default App;
