import React from "react";

export default function PageSelector(props) {
  const { nextUrl, previousUrl, handleClick } = props;

  return (
    <div className="page-selector">
      <button disabled={previousUrl === null} onClick={handleClick}>
        Prev
      </button>
      <button disabled={nextUrl === null} onClick={handleClick}>
        Next
      </button>
    </div>
  );
}
