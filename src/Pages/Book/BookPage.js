import React, { Component } from "react";
import BookShelf from "../../components/Book/BookShelf";
import PropTypes from "prop-types";

class BookPage extends Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    books: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired,
  };
  state = {
    currentlyReadingBooks: [],
    readBooks: [],
    wantToReadBooks: [],
  };
  navigateToSearch = (e) => {
    e.preventDefault();
    this.props.history.push("/search");
  };
  static getDerivedStateFromProps(props, state) {
    const currentlyReadingBooks = BookPage.filterBooks(
      "currentlyReading",
      props.books
    );
    const readBooks = BookPage.filterBooks("read", props.books);
    const wantToReadBooks = BookPage.filterBooks("wantToRead", props.books);

    return { currentlyReadingBooks, readBooks, wantToReadBooks };
  }

  static filterBooks(shelfType, books) {
    const filterdBooks = books.filter((book) => book.shelf === shelfType);
    return filterdBooks;
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              title="Currently Reading"
              books={this.state.currentlyReadingBooks}
              onBookShelfChange={this.props.onBookShelfChange}
            />
            <BookShelf
              title="Want to Read"
              books={this.state.wantToReadBooks}
              onBookShelfChange={this.props.onBookShelfChange}
            />
            <BookShelf
              title="Read"
              books={this.state.readBooks}
              onBookShelfChange={this.props.onBookShelfChange}
            />
          </div>
        </div>

        <div className="open-search">
          <button onClick={this.navigateToSearch}>Add a Book</button>
        </div>
      </div>
    );
  }
}

export default BookPage;
