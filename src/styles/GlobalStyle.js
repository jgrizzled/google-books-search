import { createGlobalStyle } from 'styled-components';
import { Normalize } from 'styled-normalize';
import baseStyle from './base.css';
import fonts from './fonts.css';

export default createGlobalStyle`
  ${Normalize}
  ${fonts}
  ${baseStyle}
`;
