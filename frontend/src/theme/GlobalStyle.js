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
    font-family: 'Cabin', sans-serif;
    background-color: white;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    overflow-y:auto;
    position:relative;
    scroll-behavior: smooth;
}

pre {
  display: block;
    padding: 8px;
    margin: 0 0 10px;
    font-family: monospace;
    color: #666 !important;
    line-height: 1.45;
    background-color: #f9f9f9;
    border: 1px solid #e1e1e1;
    border-radius: 2px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow: visible;
}

blockquote {
  display: block;
    font-family: inherit;
    font-size: inherit;
    color: #999 !important;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    padding: 0 5px 0 20px;
    border: solid #b1b1b1;
    border-width: 0 0 0 5px;
}
`;

export default GlobalStyle;
