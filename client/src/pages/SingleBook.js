import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS } from "../utils/queries";
import { Link } from "react-router-dom";

function SingleBook() {
  const location = useLocation();
  const { authors, bookId, description, image, title } = location.state;
  const { loading, data } = useQuery(QUERY_REVIEWS, {
    variables: { bookId: bookId },
  });
  const reviews = data?.reviews || [];

  return (
    <>
    <Link to="/">←Back To Search</Link>

    <div className="uk-child-width-1-3@s uk-padding top" uk-grid>
      <div>
        <div className="uk-panel uk-margin-top  uk-object-scale-down">
          <h2>{title}</h2>
          <h4>{authors}</h4>
          <img src={image} alt={`cover of ${title}`} />
          <p>{description}</p></div>
      </div>
      <div >
        <h2>Reviews</h2>
        {loading ? (
          <div>Loading...</div>
        ) : (
          reviews.map((review, i) => (
            <div key={`rev_${i}`}>
              <p>
                {review.username} at {review.createdAt}
              </p>
              <p>{review.reviewText}</p>
            </div>
          ))
        )}
      </div>
      <form className="comment-form">
        <div className="uk-panel uk-margin-top  uk-object-scale-down">
            <textarea name="comment-body" id="comment-body" className="uk-textarea uk-border-rounded" rows="10" cols="100"
                placeholder="Add Comment Here"></textarea>
            <button className="uk-button uk-button-danger uk-position-default uk-border-rounded" type="submit">ADD YOUR REVIEW</button>
        </div>
        </form>

    </div>
    </>

  );
}

export default SingleBook;