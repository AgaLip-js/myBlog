import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  cursor: pointer;
  text-transform: uppercase;
  height: 30px;
  font-size: 14px;
  border-radius: 5px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  color: white;
  border: solid 1px ${({ theme }) => theme.borders};
  background: ${({ theme }) => theme.primaryBackground};
  padding: 5px 10px;
  width: fit-content;
  transition: all 0.2s linear;
  font-family: 'Josefin Sans',sans-serif;

  :hover {
    background: ${({ theme }) => theme.lightBackground};
    box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.2), 0 22px 27px -20px rgba(7, 10, 25, 0.2);
  }
  :active {
    color: ${({ theme }) => theme.primaryBackground};
    box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.2), 0 22px 27px -20px rgba(7, 10, 25, 0.2);
  }
`;
const Button = ({ children, ...props }) => <StyledButton {...props}>{children}</StyledButton>;

export default Button;
