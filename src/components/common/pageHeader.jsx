import React from "react";

const Signup = ({ titleText, paragraph }) => {
  return (
    <div className="div">
      <div className="row">
        <div className="col-12 mt-4 text-center">
          <h1>{titleText}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <p>{paragraph}</p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
