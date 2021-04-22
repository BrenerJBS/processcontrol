import React from "react";
import styleTable from "../Table/Table.module.css";

const FilterSelect = ({ filtersobject }) => {
  return (
    <div className={styleTable.FilterText}>
      OUTROS FILTROS
      <div className={styleTable.FilterSelect}>
        {filtersobject.map((item) => {
          return (
            <label key={item.name} className={styleTable.FilterLabel}>
              {item.label}
              <div>
                <select
                  className={styleTable.FilterSelectOpt}
                  id={item.id}
                  name={item.name}
                  onChange={item.onChange}
                  value={item.value}
                >
                  <option value="">TODOS</option>
                  {item.options.map((opt) => {
                    return (
                      <option
                        key={opt[item.nameoption]}
                        value={item.nameoption !== "name" ? opt.key : opt.value}
                      >
                        {opt[item.nameoption]}
                      </option>
                    );
                  })}
                </select>
              </div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSelect;
