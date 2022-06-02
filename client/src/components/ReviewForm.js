import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../../utils/mutations';
import { QUERY_REVIEWS, GET_ME } from '../../utils/queries';

const ReviewForm = () => {
  const [reviewText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [createReview, { error }] = useMutation(CREATE_REVIEW, {
    update(cache, { data: { createReview } }) {
      
        // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...me, reviews: [...me.reviews, createReview] } },
        });
      } catch (e) {
        console.warn("First review insertion by user!")
      }

      // update thought array's cache
      const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });
      cache.writeQuery({
        query: QUERY_REVIEWS,
        data: { reviews: [createReview, ...reviews] },
      });
    }
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await createReview({
        variables: { reviewText },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        Character Count: {characterCount}/280
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Here's a new thought..."
          value={reviewText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
