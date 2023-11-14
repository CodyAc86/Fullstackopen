import React from "react";

function Person({ person, handleDelete }) {
  return (
    <p key={person.id}>
      {person.name} {person.number}
      &nbsp;<button onClick={() => handleDelete(person.id)}>Delete</button>
    </p>
  );
}

export default Person;