import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const Container = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  font-size: 1.5rem;
`;

export default props => (
  <Container onClick={props.toggleTheme}>
    {props.isDarkTheme ? (
      <FontAwesomeIcon icon={faSun} />
    ) : (
      <FontAwesomeIcon icon={faMoon} />
    )}
  </Container>
);
