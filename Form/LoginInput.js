import React from "react";
import styles from "./LoginInput.module.css";
import Error from "../Components/Helper/Error";

const LoginInput = (props) => {
  return (
    <div className={styles.wrapper}>
      <label htmlFor={props.name} className={styles.label}>
        {props.label}
      </label>
      <input
        className={styles.input}
        type={props.type}
        id={props.id}
        name={props.name}
        required={props.required}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
      />
      <Error error={props.error} />
    </div>
  );
};

export default LoginInput;
