import React from "react";

export default function Card(props) {
  const { name, url } = props;

  return (
    <div key={name}>
      <p>{name}</p>
    </div>
  );
}
