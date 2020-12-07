import React, { Fragment } from "react";

export default function AboutInfo(props) {
  const { data, label } = props;

  return (
    <Fragment>
      <span className="stat-title">{label}</span>
      <span className="about-value">{data}</span>
    </Fragment>
  );
}
