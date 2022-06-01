import React from 'react';

import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_BOOK } from "../utils/mutations";

const WantTo = () => {
  const { loading, data } = useQuery(GET_ME);
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);
  const userData = data?.me || [];
//   const userDataLength = Object.keys(userData).length;

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleRemoveBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeBook({
        variables: { bookId },
      });

      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid className='text-light bg-dark'>
        <div>
          <h1>Books I Want To Read</h1>
        </div>
      </div>
      <div>
        <h2>
          {userData.readingList?.length
            ? `Viewing ${userData.readingList.length} saved ${userData.readingList.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <div>
          {userData.readingList?.map((book) => {
            return (
              <div key={book.bookId} border='dark'>
                {book.image ? (
                   <img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> 
                   ): null}
                <div>
                  <h2>{book.title}</h2>
                  <p className='small'>Authors: {book.authors}</p>
                  <p>{book.description}</p>
                  <button className='btn-block btn-danger' onClick={() => handleRemoveBook(book.bookId)}>
                    Remove this Book!
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default WantTo;