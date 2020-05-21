import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>

      <input
        style={{
          width: "100%",
          border: "none",
          outline: "none",
          boxShadow: "none",
          background: "none",
          color: "white",
          fontSize: "18px",
          float: "left",
          margin: "0 5px",
        }}
        placeholder={label}
        {...rest}
        name={name}
        className="form-control"
        id={name}
      />
      {error && (
        <span
          className="text-danger"
          style={{ float: "left", fontSize: "14px" }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
