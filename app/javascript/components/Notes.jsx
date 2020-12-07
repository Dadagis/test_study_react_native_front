import React, { Fragment } from "react";

export default function Notes() {
  return (
    <Fragment>
      <textarea
        className="note-input"
        type="text"
        placeholder="Attach a note to your pokemon"
      />
    </Fragment>
  );
}
