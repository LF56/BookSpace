import React from "react";
import Books from "../components/Books";

function SingleBook(props) {
  return (
    <div>
      <Books
        key={props.i}
        bookId={props.bookId}
        title={props.title}
        authors={props.authors}
        description={props.description}
        image={props.image}
        onClick={props.handleSaveBook}
      />
    </div>
  );
}

export default SingleBook;
