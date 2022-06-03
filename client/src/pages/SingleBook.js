import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS, GET_ME } from "../utils/queries";
import { Link } from "react-router-dom";

function SingleBook() {
  const location = useLocation();
  const { authors, bookId, description, image, title } = location.state;
  const { loading, data, refetch } = useQuery(QUERY_REVIEWS, {
    variables: { bookId: bookId },
  });
  const reviews = data?.reviews || [];
  const [reviewText, setReviewText] = useState("");
  const me = useQuery(GET_ME);
  console.log(me);
  const [createReview] = useMutation(CREATE_REVIEW, {
    update(cache, { data: { createReview } }) {
      try {
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, reviews: [...me.reviews, createReview] } },
        });
      } catch (err) {
        console.warn("First review by user.");
      }

      const { reviews } = cache.readQuery({
        query: QUERY_REVIEWS,
        variables: { bookId: bookId },
      });
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [createReview, ...reviews] },
      });
    },
  });

  const handleChange = async (event) => {
    setReviewText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createReview({
        variables: { reviewText, bookId: bookId },
      });
      setReviewText("");
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Link to="/">←Back To Search</Link>
      <div
        className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
        uk-grid="true">
        <div>
          <div className="uk-card uk-card-default" id="single-book">
            <div className="uk-card-media-top">
              <h2>{title}</h2>
              <h4>{authors}</h4>
              <img src={image} alt={`cover of ${title}`} />
              <p className="uk-panel-scrollable">{description}</p>
            </div>
          </div>
        </div>

        <div
          className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
          uk-grid="true">
          <div>
            <div className="uk-card uk-card" id="rewiews">
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
            <form className="review-form" onSubmit={handleSubmit}>
              <div className="uk-panel uk-margin-top  uk-object-scale-down">
                <textarea
                  name="review-body"
                  id="review-body"
                  className="uk-textarea uk-border-rounded"
                  rows="10"
                  cols="100"
                  value={reviewText}
                  placeholder="Add your review..."
                  onChange={handleChange}></textarea>
                <button
                  className="uk-button uk-position-default uk-border-rounded"
                  type="submit">
                  ADD YOUR REVIEW
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleBook;
