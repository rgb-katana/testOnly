import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background: #ffffff;
    min-height: 100vh;
    margin-left: 320px;
    margin-right: 160px;

    @media (max-width: 320px) {
      margin-left: 20px;
      margin-right: 20px;
    }
    color: #333;
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
