import React from "react";
import stylesUpper from "../Components/Helper/upperCase.module.css";

const Thead = ({ theads }) => {
  return (
    <thead>
      <tr className={stylesUpper.upperCase}>
        {theads.map((item) => {
          return <th key={item}>{item}</th>;
        })}
      </tr>
    </thead>
  );
};

export default Thead;
