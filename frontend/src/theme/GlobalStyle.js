import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*:focus {
  outline: none;
}
body{
    margin: 0;
    padding: 0;
    font-size: 16px;
    height: 100%;
    width: 100%;
    color: #25313B;
    font-family: 'Josefin Sans', sans-serif;
    background-color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y:auto;
    position:relative;
    scroll-behavior: smooth;
}
`;

export default GlobalStyle;
