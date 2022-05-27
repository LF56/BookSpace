import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { searchGoogleBooks } from "../utils/API";

//IMPORT MUTATION FOR SAVE BOOKS
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
    const [searchedBooks, setSearchedBooks] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());
    const [saveBook, { error }] = useMutation(SAVE_BOOK);

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
                <div class="uk-margin">
                    <input class="uk-input uk-form-success uk-form-width-medium" type="text" 
                    name='searchInput' 
                    placeholder="Find A Book" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onSubmit={handleFormSubmit} />
                   <button class="uk-button uk-button-default" type='submit'>Search</button>
                </div>
            </div>
        

        </>
    );
};

export default SearchBooks;
