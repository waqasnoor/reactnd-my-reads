import React from "react";
import SearchPage from "./Pages/Search";
import BookPage from "./Pages/Book";
import * as BooksAPI from "./utils/BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";

class BooksApp extends React.Component {
  state = { books: [] };
  searchBooks = (query) => {
    return new Promise((resolve, reject) => {
      BooksAPI.search(query).then((res) => {
        if (res.error) {
          return resolve([]);
        }
        const books = res.map((book) => {
          const bookOnShelf = this.state.books.find((b) => b.id === book.id);
          if (bookOnShelf) {
            return { ...book, shelf: bookOnShelf.shelf };
          }
          return { ...book, shelf: "none" };
        });
        resolve(books);
      });
    });
  };
  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  };
  componentDidMount() {
    this.fetchBooks();
  }
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((response) => {
      this.fetchBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={({ history }) => (
            <BookPage
              history={history}
              books={this.state.books}
              onBookShelfChange={this.updateBookShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <SearchPage
              search={this.searchBooks}
              onBookShelfChange={this.updateBookShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
