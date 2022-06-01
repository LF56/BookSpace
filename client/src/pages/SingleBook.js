import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS } from "../utils/queries";

function SingleBook() {
  const location = useLocation();
  const { authors, bookId, description, image, title } = location.state;
  return (
    <div>
      <h2>{title}</h2>
      <h4>{authors}</h4>
      <img src={image} alt={`cover of ${title}`} />
      <p>{description}</p>
      <h2>Reviews</h2>
    </div>
  );
}

export default SingleBook;
