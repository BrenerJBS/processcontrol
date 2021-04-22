import React from "react";
import Thead from "./Thead";

const Table = (props) => {
  return (
    <>
      <table className="containerExcel">
        <Thead theads={props.theads} />
        {props.carregando ? (
          <tbody>
            <tr>
              <td style={{ marginLeft: "10px" }}>Carregando... Aguarde</td>
            </tr>
          </tbody>
        ) : (
          <tbody></tbody>
        )}
      </table>
    </>
  );
};

export default Table;
