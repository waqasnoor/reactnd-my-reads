import React, { Component } from "react";

export class Book extends Component {
  onBookShelfChange = (event) => {
    const shelf = event.target.value;
    this.props.onBookShelfChange(this.props.book, shelf);
  };
  render() {
    const { book } = this.props;
    return (
      <li key={book.id}>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url("${book.imageLinks.thumbnail}")`,
              }}
            />
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.onBookShelfChange}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.authors ? book.authors.join(",") : ""}
          </div>
        </div>
      </li>
    );
  }
}
