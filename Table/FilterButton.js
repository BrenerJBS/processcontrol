import React from "react";
import styleTable from "../Table/Table.module.css";

const FilterButton = ({ filtersobject }) => {
  return (
    <div className={styleTable.FilterText}>
      FILTROS MAIS UTILIZADOS
      <div className={styleTable.FilterButtons}>
        {filtersobject.map((item) => {
          return (
            <button
              key={item.id}
              id={item.id}
              value={item.value}
              className={item.className}
              onClick={item.onClick}
              name={item.name}
            >
              {item.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterButton;
