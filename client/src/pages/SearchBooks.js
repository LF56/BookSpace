import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { searchGoogleBooks } from "../utils/API";

import { useMutation } from '@apollo/client';
import { addTolist } from '../utils/mutations';
import Books from '../components/Books';

const SearchBooks = () => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
    const [saveBook, { error }] = useMutation(addTolist);

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
                throw new Error('something went wrong!');
            }

            const { items } = await response.json();

            const bookData = items.map((book) => ({
                bookId: book.id,
                authors: book.volumeInfo.authors || ['No author to display'],
                title: book.volumeInfo.title,
                description: book.volumeInfo.description,
                image: book.volumeInfo.imageLinks?.thumbnail || '',
            }));

            setSearchedBooks(bookData);
            setSearchInput('');
        } catch (err) {
            console.error(err);
        }
    };

    // saving book to database
    const handleSaveBook = async (bookId) => {
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }
        try {
            const { data } = await saveBook({
                variables: { newBook: { ...bookToSave } }
            });

            setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <div className="uk-container" id='search-book'>
                <h1 className='uk-align-center'>Find Books</h1>
                <div className="uk-margin">
                    <form onSubmit={handleFormSubmit}>
                        <input className="uk-input uk-form uk-form-width-medium" type="text"
                            name='searchInput'
                            placeholder="Find A Book"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button className="uk-button uk-button-default" type='submit' onClick={handleSaveBook}>Search</button>
                    </form>
                </div>
            </div>
            <div className="uk-child-width-1-3@m uk-grid-small uk-grid-match" uk-grid="true">
                {searchedBooks.map((book) => <Books key={book.title} title={book.title} author={book.author} description={book.description} image={book.image}
                />
                
                )}

            </div>

        </>
    );
};

export default SearchBooks;
