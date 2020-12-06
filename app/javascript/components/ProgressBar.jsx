import React from "react";

export default function ProgressBar(props) {
  const { baseStat } = props;
  const average = (baseStat * 100) / 255;

  const barFiller = {
    height: "100%",
    width: `${average}%`,
    backgroundColor: baseStat > 50 ? "green" : "red",
    borderRadius: "inherit",
    textAlign: "right",
  };

  return (
    <div className="bar-container">
      <div style={barFiller}></div>
    </div>
  );
}
