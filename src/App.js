import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import PageHeader from './components/PageHeader/PageHeader';
import SearchForm from './components/SearchForm/SearchForm';
import BookList from './components/BookList/BookList';
import fetchBooks from './fetchBooks';

const RootDiv = styled.div`
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: auto;
  background-color: ${props => props.theme.color.background};
  font-family: ${props => props.theme.font.main};
  color: ${props => props.theme.color.onBackground};
  a {
    color: ${props => props.theme.color.link};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  text-align: center;
  color: ${props => props.theme.color.error};
`;

class App extends React.Component {
  static defaultProps = {
    maxResults: 10,
    isDarkTheme: false
  };
  constructor(props) {
    super(props);
    this.state = {
      isDarkTheme: props.isDarkTheme,
      queryParams: {
        q: '',
        bookType: 'all',
        printType: 'all'
      },
      form: {
        q: '',
        bookType: 'all',
        printType: 'all'
      },
      books: [],
      totalBooks: 0,
      page: 1,
      error: null
    };
  }
  handleSubmit = async e => {
    e.preventDefault();
    try {
      const { totalBooks, books } = await fetchBooks(
        this.state.form,
        1,
        this.props.maxResults
      );
      if (books.length === 0)
        this.setState({
          books: [],
          page: 1,
          totalBooks: 0,
          error: 'No books found'
        });
      else
        this.setState({
          totalBooks,
          books,
          page: 1,
          queryParams: { ...this.state.form },
          error: null
        });
    } catch (e) {
      this.setState({
        books: [],
        page: 1,
        totalBooks: 0,
        error: 'Failed to fetch books'
      });
      console.log(e);
    }
  };
  setPage = async page => {
    if (page * this.props.maxResults > this.state.totalBooks || page < 0)
      return;
    try {
      const { books } = await fetchBooks(
        this.state.queryParams,
        page,
        this.props.maxResults
      );
      this.setState({ books, page, error: null });
    } catch (e) {
      console.log(e);
      this.setState({ error: 'Failed to fetch books' });
    }
  };
  setBookType = value => {
    const form = { ...this.state.form, bookType: value };
    this.setState({ form });
  };
  setPrintType = value => {
    const form = { ...this.state.form, printType: value };
    this.setState({ form });
  };
  setQuery = value => {
    const form = { ...this.state.form, q: value };
    this.setState({ form });
  };
  toggleTheme = () => {
    this.setState({ isDarkTheme: !this.state.isDarkTheme });
  };
  render() {
    return (
      <ThemeProvider
        theme={this.props.themes[this.state.isDarkTheme ? 'dark' : 'light']}
      >
        <RootDiv>
          <PageHeader
            toggleTheme={this.toggleTheme}
            isDarkTheme={this.state.isDarkTheme}
          />
          <SearchForm
            queryParams={this.state.form}
            handleSubmit={this.handleSubmit}
            setBookType={this.setBookType}
            setPrintType={this.setPrintType}
            setQuery={this.setQuery}
          />
          {this.state.error && <ErrorText>{this.state.error}</ErrorText>}
          <BookList
            books={this.state.books}
            totalBooks={this.state.totalBooks}
            maxResults={this.props.maxResults}
            page={this.state.page}
            setPage={this.setPage}
          />
        </RootDiv>
      </ThemeProvider>
    );
  }
}

export default App;
