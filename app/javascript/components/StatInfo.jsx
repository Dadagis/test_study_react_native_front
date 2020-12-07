import React, { Fragment } from "react";
import ProgressBar from "./ProgressBar";

export default function StatInfo(props) {
  const { data, label } = props;

  return (
    <Fragment>
      <span className="stat-title">{label}</span>
      <span className="stat-value">{data}</span>
      <ProgressBar baseStat={data} />
    </Fragment>
  );
}
