import React, { Fragment, useState } from "react";
import axios from "axios";

export default function Notes(props) {
  const { user, id } = props;
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
          console.log(response);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };

  return (
    <Fragment>
      <p className="note">Je suis une note sur un pokémon</p>
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
