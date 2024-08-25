import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  
  *, *::before, *::after {
    box-sizing: border-box; 
    margin: 0;
    padding: 0;
  }

  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-family: SpoqaHanSans; 
    background-color: #f0f0f0; 
    color: #333; 
    overflow: hidden; 
  }

  #root {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column; 
    overflow: auto; 
  }

  
  h1, h2, h3, h4, h5, h6, p, ul, ol, li, figure, blockquote, dl, dd {
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: inherit; 
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;
    font-family: inherit; 
  }

  img {
    max-width: 100%;
    height: auto; 
    display: block;
  }

  
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;
