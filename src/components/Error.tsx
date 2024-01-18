import React from "react";

const Error = ({ props }) => {
  return (
    <>
      {props.errorName && (
        <p className="text-red-500 font-bold text-sm ml-2">{props.errorName}</p>
      )}
    </>
  );
};

export default Error;
