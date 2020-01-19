import React from 'react';
import SearchBox from '../SearchBox/SearchBox';
import Selector from '../Selector/Selector';
import styled from 'styled-components';

const bookTypeOptions = [
  { value: 'all', text: 'All' },
  { value: 'free-ebooks', text: 'Free' },
  { value: 'paid-ebooks', text: 'Paid' }
];

const printTypeOptions = [
  { value: 'all', text: 'All' },
  { value: 'books', text: 'Books' },
  { value: 'magazines', text: 'Magazines' }
];

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${props => props.theme.color.surface};
  color: ${props => props.theme.color.onSurface};
  padding-top: 0.5rem;
`;
const SubmitButton = styled.input.attrs(() => ({ type: 'submit' }))`
  border-radius: 4px;
  padding: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: ${props => props.theme.space.small};
  margin: ${props => props.theme.space.small};
`;

export default props => (
  <Form onSubmit={e => props.handleSubmit(e)}>
    <Container>
      <SearchBox
        id="search-box"
        value={props.queryParams.query}
        onChange={props.setQuery}
      />
      <SubmitButton value="Search" />
    </Container>
    <Container>
      <Selector
        title="Book Type"
        id="book-type"
        options={bookTypeOptions}
        selected={props.queryParams.bookType}
        onChange={props.setBookType}
      />
      <Selector
        title="Print Type"
        id="print-type"
        options={printTypeOptions}
        selected={props.queryParams.printType}
        onChange={props.setPrintType}
      />
    </Container>
  </Form>
);
