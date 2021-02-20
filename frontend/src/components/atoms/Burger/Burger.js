import React from "react";
import styled from "styled-components";

const StyledBurger = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 99;
  display: none;

  &:focus {
    outline: none;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background: white;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 3px;
    margin: 5px 0;

    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }

    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
  @media (max-width: 900px) {
    display: block;
  }
`;

const Burger = ({ open, setOpen }) => (
    <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
    </StyledBurger>
);

export default Burger;
