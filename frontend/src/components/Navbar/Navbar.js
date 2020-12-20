import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/developer.png";
import mainLogo from "../../assets/logo.jpg";

const StyledTopContainer = styled.div`
height: 200px;
display:flex;
justify-content:center;
align-items:center;
`
const StyledNavBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: ${({ props }) => (props ? 'sticky' : 'relative')};
  z-index: 15;
  background-color:${({theme})=> theme.primaryBackground};
  transition: all 0.2s linear;
  height: 80px;
  text-align: center;
  box-shadow: 5px 5px 5px #dedede;
  align-items: center;
  top: 0;
  @media (max-width: 900px) {
    height: 80px;
  }
`;

const StyledNavItem = styled(NavLink)`
  border: none;
  position: relative;
  display: block;
  transform: ${({ props }) => (props ? 'translateX(0%)' : 'translateX(-150%)')};
transition: transform 0.3s linear;
`;
const StyledMainImage = styled.div`
  background: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width:600px;
  height:115px;

`

const StyledMainLogo = styled.div`
  background: url(${({ icon }) => icon});
  width: 60px;
  height: 60px;
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  margin-left: 15px;
  /* @media (max-width: 900px) {
    width: 50px;
  } */
`;
const StyledListItemView = styled.ul`
  display: flex;
  justify-content: space-around;
  position: relative;

  padding: 0;
  align-items: center;
  margin-right: 10%;
  @media (max-width: 900px) {
    display: none;
  }
`;

const StyledItemView = styled.li`
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  color: white;
  font-size: 18px;
  font-weight:500;
  height: 40px;
  margin: 40px;
  list-style-type: none;
  position: relative;
  display: flex;
  text-align: center;
  text-decoration: none;
  transition: transform 0.2s ease-out;

  :hover {
    color: #cadcec;
  }
  ::after {
    position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 0%;
  content: '.';
  color: transparent;
  background: #cadcec;
  height: 2px;
  transition: all .5s;
  }
  :hover {
    ::after {
        width: 100%;
    }
  }
::before {
    transition: all .5s;
}
&.active {
    color: #cadcec;
    ::after {
        width: 100%;
    }
  }
`;

const Navbar = () => {
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY >= 200
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    window.addEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scroll({top:0, behavior:'smooth'})
  };
  console.log(navBackground);
  console.log(navRef.current);


  return (
      <>
      <StyledTopContainer >
    <StyledMainImage icon={mainLogo} as={NavLink} to="/">
    </StyledMainImage>
    </StyledTopContainer>
    <StyledNavBar props={navBackground} ref={navRef}>
      <StyledNavItem as={NavLink} to="/" onClick={scrollToTop} props={navBackground}>
        <StyledMainLogo icon={logo} />
      </StyledNavItem>
      <StyledListItemView>
        <StyledItemView as={NavLink} to="/nauka" activeclass="active">
          Nauka
        </StyledItemView>
        <StyledItemView as={NavLink} to="/artykuly" activeclass="active">
          Artykuły
        </StyledItemView>
        <StyledItemView as={NavLink} to="/o-mnie" activeclass="active">
          O mnie
        </StyledItemView>
      </StyledListItemView>
    </StyledNavBar>
    </>

  );
};

export default Navbar;
