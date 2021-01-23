import React, { Component } from "react";
import BookList from "./BookList";

class BookShelf extends Component {
  render() {
    const { title, books, onBookShelfChange } = this.props;
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <BookList books={books} onBookShelfChange={onBookShelfChange} />
        </div>
      </div>
    );
  }
}
export default BookShelf;
