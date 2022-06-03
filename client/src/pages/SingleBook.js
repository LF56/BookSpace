import React from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS } from "../utils/queries";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

function SingleBook() {
  const location = useLocation();
  const [createReview] = useMutation(CREATE_REVIEW);
  
  const { authors, bookId, description, image, title } = location.state || {};
  const { loading, data } = useQuery(QUERY_REVIEWS, {
    variables: { bookId: bookId },
    
  });
  const reviews = data?.reviews || [];

  const handleCreateReview = (review) => async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await createReview({
        variables: { bookId },
      });

      createReview(bookId);
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Link to="/">←Back To Search</Link>
      <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
        uk-grid="true">
        <div>
          <div className="uk-card uk-card-default" id="single-book">
            <div className="uk-card-media-top">
              <h2>{title}</h2>
              <h4>{authors}</h4>
              <img src={image} alt={`cover of ${title}`} />
              <p>{description}</p></div>
          </div>
        </div>


        <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
          uk-grid="true">
          <div>
            <div className="uk-card uk-card" id="rewiews">
              <h2>My Reviews</h2>
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
                  placeholder="ADD REVIEW HERE"></textarea>
                <button className="uk-button uk-button-danger uk-position-default uk-border-rounded" type="submit" onClick={() => handleCreateReview}>ADD YOUR REVIEW</button>
              </div>
            </form>
          </div>
        </div>
      </div>






    </>

  );
}

export default SingleBook;
