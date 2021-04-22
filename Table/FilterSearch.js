import React from "react";
import styleTable from "../Table/Table.module.css";

const FilterSearch = ({ value, onChange }) => {
  return (
    <div className={styleTable.FilterTextSearch}>
      <label>
        Busca
        <div>
          <input
            className={styleTable.FilterSearch}
            type="text"
            name="search"
            id="search"
            value={value}
            onChange={onChange}
          />
        </div>
      </label>
    </div>
  );
};

export default FilterSearch;
