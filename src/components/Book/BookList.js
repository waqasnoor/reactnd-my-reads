import React, { Component } from "react";
import { Book } from "./Book";

class BookList extends Component {
  render() {
    const { books, onBookShelfChange } = this.props;
    return (
      <ol className="books-grid">
        {books
          .filter((book) => {
            const { imageLinks } = book;
            if (imageLinks && imageLinks.thumbnail) {
              return true;
            }
            return false;
          })
          .map((book) => (
            <Book
              book={book}
              key={book.id}
              onBookShelfChange={onBookShelfChange}
            />
          ))}
      </ol>
    );
  }
}

export default BookList;
