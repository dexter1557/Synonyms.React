import React from "react";

const ListOfWords = ({ synonyms }) => (
  <div className="col-6">
    List
    <ul>
      {synonyms.map((val, index) => (
        <li key={index}>
          term: {val.term} <br></br>
          {val.synonyms}
        </li>
      ))}
    </ul>
  </div>
);

export default ListOfWords;
