import React from 'react';
import styled from 'styled-components';
import Book from '../Book/Book';

const Section = styled.section`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.onBackground};
  margin-bottom: 3rem;
  h2 {
    text-align: center;
  }
  ul {
    margin: ${props => props.theme.space.medium} auto;
    max-width: 500px;
    padding: 0 1rem;
    list-style: none;
  }
`;

const CenteredText = styled.p`
  text-align: center;
  margin: 1rem 0;
`;

const PageLink = styled.a`
  font-size: ${props => props.theme.fontSize.large};
`;

const BookList = props => {
  const start = (props.page - 1) * props.maxResults + 1;
  const end = start + props.maxResults - 1;
  return (
    <Section id="books">
      {props.books.length > 0 && (
        <>
          <h2>Books</h2>
          <CenteredText>
            Showing {start} - {end} of {props.totalBooks}
          </CenteredText>
        </>
      )}
      <ul>
        {props.books.map((book, i) => (
          <Book book={book} key={i} />
        ))}
      </ul>
      {props.maxResults < props.totalBooks && (
        <CenteredText>
          {start >= props.page - 1 * props.maxResults && (
            <PageLink
              href="#books"
              onClick={() => props.setPage(props.page - 1)}
            >
              Prev
            </PageLink>
          )}
          &nbsp;|&nbsp;
          {end <= props.totalBooks - props.maxResults && (
            <PageLink
              href="#books"
              onClick={() => props.setPage(props.page + 1)}
            >
              Next
            </PageLink>
          )}
        </CenteredText>
      )}
    </Section>
  );
};

export default BookList;
