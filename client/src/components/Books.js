import React from "react";

function Books(props) {
  return (
    <div className="uk-card-small uk-height-max-medium">
      <div className="uk-card-media-top">
        <img
          src={props.image}
          width="auto"
          height="auto"
          className="uk-object-position-center"
          alt=""
        />
      </div>
      <div className="uk-card-body" id="book-card">
        <h3 className="uk-card-title" id="book-title">
          {props.title}
        </h3>
        <p className="book-authors">Author:{props.authors}</p>
        <p className="uk-panel-scrollable" id="book-description">
          {props.description}
        </p>
        <p>{props.stars}</p>
        <button className="uk-button" id={props.bookId} onClick={props.onClick}>
          I Want to read this!
        </button>
      </div>
    </div>
  );
}

export default Books;
