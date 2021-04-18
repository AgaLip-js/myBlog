import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.primaryBackground};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  text-align: left;
  position: absolute;
  height: 350px;
  top: 0.5rem;
  left: 0;
  z-index: 22;
  transition: transform 0.3s ease-in-out;

  @media (max-width: 900px) {
    width: 100%;
  }

  a {
    text-align: center;
    text-transform: uppercase;
    padding: 1rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: white;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: ${({ theme }) => theme.primaryText};
    }
  }
`;
const StyledListItemView = styled.ul`
  display: flex;
  justify-content: space-around;
  position: relative;
  margin: 0;
  padding: 0;
  align-items: center;
  flex-direction: column;
`;

const StyledItemView = styled.li`
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  color: rgba(0, 0, 0, 0.7);
  font-size: 16px;
  height: 35px;
  margin: 15px;
  padding: 10px;
  list-style-type: none;
  position: relative;
  display: flex;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease-out;

  :hover {
    color: white;
  }

  &.active {
    font-weight: 600;
    color: ${({ theme }) => theme.lightBackground};
  }
`;
const Menu = ({ open, setOpen }) => (
    <StyledMenu open={open}>
        <StyledListItemView>
            <StyledItemView
                as={NavLink}
                to="/nauka"
                activeclass="active"
                onClick={() => setOpen(!open)}
            >
                Nauka
            </StyledItemView>
            <StyledItemView
                as={NavLink}
                to="/artykuly"
                activeclass="active"
                onClick={() => setOpen(!open)}
            >
                Artykuły
            </StyledItemView>
            <StyledItemView
                as={NavLink}
                to="/o-mnie"
                activeclass="active"
                onClick={() => setOpen(!open)}
            >
                O mnie
            </StyledItemView>
        </StyledListItemView>
    </StyledMenu>
);

export default Menu;
