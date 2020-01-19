import React from 'react';
import styled from 'styled-components';
import ThemeToggler from '../ThemeToggler/ThemeToggler';

const Header = styled.header`
  background-color: ${props => props.theme.color.primary};
  color: ${props => props.theme.color.onPrimary};
  text-align: center;
  padding: 0.5rem 0;
  position: relative;
`;

const H1 = styled.h1`
  margin: 0 auto;
  font-size: ${props => props.theme.fontSize.extraLarge};
`;

export default props => (
  <Header>
    <H1>Google Books Search</H1>
    <ThemeToggler
      toggleTheme={props.toggleTheme}
      isDarkTheme={props.isDarkTheme}
    />
  </Header>
);
