import React from 'react';
import styled from 'styled-components';

const Select = styled.select`
  width: 7rem;
  margin-left: 1rem;
  background-color: ${props => props.theme.color.background};
  color: ${props => props.theme.color.onBackground};
`;
const Container = styled.span`
  min-width: fit-content;
  margin: 0.5rem 1rem;
`;

const Selector = props => (
  <Container>
    {props.title}
    <Select
      id={props.id}
      name={props.id}
      value={props.selected}
      onChange={e => props.onChange(e.target.value)}
    >
      {props.options.map((o, i) => (
        <option key={i} value={o.value}>
          {o.text}
        </option>
      ))}
    </Select>
  </Container>
);

export default Selector;
