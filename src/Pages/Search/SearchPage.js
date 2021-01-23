import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookList from "../../components/Book/BookList";

class SearchPage extends Component {
  static propTypes = {
    onBookShelfChange: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
  };

  state = { books: [], search: "" };
  timer = null;
  updateSearch = (evt) => {
    const search = evt.target.value;
    if (!search) {
      return this.setState({ books: [], search });
    }
    this.setState((oldState) => ({ ...oldState, search }));
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      this.props.search(search).then((response) => {
        if (response.error) {
          this.setState((oldState) => ({ ...oldState, books: [] }));
        } else {
          this.setState((oldState) => ({ ...oldState, books: response }));
        }
      });
    }, 500);
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}

            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.updateSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.state.books.length > 0 && (
            <BookList
              books={this.state.books}
              onBookShelfChange={this.props.onBookShelfChange}
            />
          )}
          {this.state.books.length === 0 && this.state.search && (
            <p>Books not found</p>
          )}
        </div>
      </div>
    );
  }
}

export default SearchPage;
