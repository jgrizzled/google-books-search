import React from 'react';
import styled from 'styled-components';

const TextInput = styled.input`
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.onBackground};
  border: 1px solid ${props => props.theme.color.onSurface};
  border-radius: 4px;
  padding: 0.25rem;
  margin-right: 1rem;
`;

const SearchBox = props => (
  <TextInput onChange={e => props.onChange(e.target.value)} />
);

export default SearchBox;
