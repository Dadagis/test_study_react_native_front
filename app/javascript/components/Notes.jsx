import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

export default function Notes(props) {
  const { userInfos, id } = props;
  const [user, setUser] = useState(userInfos);
  const [value, setValue] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("/api/v1/notes/", {
          note: {
            user_id: user.id,
            content: value,
            pokemon_number: id,
          },
        })
        .then((response) => {
          setUser(response.data);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };

  const displayNotes = user.notes.map((note) => {
    return (
      <p key={note.id} className="note">
        {note.content}
      </p>
    );
  });

  return (
    <Fragment>
      {displayNotes}
      <form className="note-form">
        <textarea
          className="note-input"
          type="text"
          placeholder="Attach a note to your pokemon"
          value={value}
          onChange={handleChange}
        />
        <button
          disabled={value === "" ? true : false}
          onClick={handleClick}
          type="submit"
        >
          Save
        </button>
      </form>
    </Fragment>
  );
}
