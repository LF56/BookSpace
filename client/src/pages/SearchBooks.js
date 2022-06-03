import React, { useState, useEffect } from "react";
import Auth from "../utils/auth";
import { saveBookIds, getSavedBookIds } from "../utils/localStorage";
import { searchGoogleBooks } from "../utils/API";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_BOOK } from "../utils/mutations";
import Books from "../components/Books";

const SearchBooks = () => {
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
  const [saveBook] = useMutation(SAVE_BOOK);

  //SET SAVED BOOKS TO LOCAL STORAGE
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    try {
      const response = await searchGoogleBooks(searchInput);

      if (!response.ok) {
        throw new Error("something went wrong!");
      }

      const { items } = await response.json();

      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ["No author to display"],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        link: book.selfLink,
        image: book.volumeInfo.imageLinks?.thumbnail || "",
      }));
      // console.log(items);
      setSearchedBooks(bookData);
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  // saving book to database
  const handleSaveBook = async (event) => {
    const bookToSave = searchedBooks.find(
      (book) => book.bookId === event.target.id
    );
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      console.log("You must be logged in to do that!");
      return false;
    }

    try {
      await saveBook({
        variables: { input: { ...bookToSave } },
      });

      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="uk-container" id="search-book">
        <h1 className="uk-align-center">Find Books</h1>
        <div className="uk-margin">
          <form onSubmit={handleFormSubmit}>
            <input
              className="uk-input uk-form uk-form-width-medium"
              type="text"
              name="searchInput"
              placeholder="Find A Book"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button className="uk-button" id="search-btn" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <div
        className="uk-child-width-1-3@m uk-grid-small uk-grid-match"
        uk-grid="true">
        {searchedBooks.map((book, i) => (
          <div className="uk-card-small uk-height-max-meduim">
            <Link
              to={{
                pathname: `/book`,
              }}
              state={{
                ...book,
              }}
              key={`book_${i}`}>
              <Books
                key={i}
                bookId={book.bookId}
                title={book.title}
                authors={book.authors}
                description={book.description}
                image={book.image}
                disabled={true}
              />
            </Link>
            <div>
            <button
              className="uk-button"
              key={`btn_${book.bookId}`}
              id={book.bookId}
              onClick={handleSaveBook}>
              I Want to read this!
            </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchBooks;
