import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

export default function Notes(props) {
  const { userInfos, id } = props;
  const [user, setUser] = useState(userInfos);
  const [value, setValue] = useState("");

  // Handle a click on create a new note feature
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
          setValue("");
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle a click on the delete a note feature
  const handleDelete = async (noteId) => {
    const payload = {
      note: { note_id: noteId, user_id: user.id, pokemon_number: id },
    };
    try {
      axios.delete(`/api/v1/notes/${noteId}`, { data: payload }).then((r) => {
        setUser(r.data);
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  // handle keyboard inputs and update the state
  const handleChange = ({ currentTarget: input }) => {
    setValue(input.value);
  };

  const displayNotes = user.notes.map((note) => {
    return (
      <Fragment key={`${note.id} ${id}`}>
        <p key={note.id} className="note">
          {note.content}
        </p>
        <i
          key={note.content}
          onClick={() => handleDelete(note.id)}
          className="fas fa-times-circle delete-mark"
        ></i>
      </Fragment>
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
