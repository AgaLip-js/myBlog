import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/developer.png";
import mainLogo from "../../assets/logo.jpg";
import { clearCategory, handleSearchValue } from "../../redux/actions/globalActions";
import history from "../../templates/history";
import { useOnClickOutside } from "../../utils/hooks";
import Burger from "../atoms/Burger/Burger";
import SearchInput from "../atoms/SearchInput/SearchInput";
import Menu from "../MenuBurger/MenuBurger";

const StyledTopContainer = styled.div`
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const StyledNavBar = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: ${({ props }) => (props ? "sticky" : "relative")};
    z-index: 15;
    background-color: ${({ theme }) => theme.primaryBackground};
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

const StyledNavItem = styled.a`
    cursor: pointer;
    border: none;
    position: relative;
    display: block;
    transform: ${({ props }) => (props ? "translateX(0%)" : "translateX(-150%)")};
    transition: transform 0.3s linear;
    margin-right: auto;
`;
const StyledMainImage = styled.div`
    background: url(${({ icon }) => icon});
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    width: 600px;
    height: 115px;
    cursor:pointer;
`;

const StyledMainLogo = styled.div`
    background: url(${({ icon }) => icon});
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-size: contain;
    display: block;
    margin-left: 15px;
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
    font-weight: 500;
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
        content: ".";
        color: transparent;
        background: #cadcec;
        height: 2px;
        transition: all 0.5s;
    }
    :hover {
        ::after {
            width: 100%;
        }
    }
    ::before {
        transition: all 0.5s;
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
            const show = window.scrollY >= 200;
            if (navRef.current !== show) {
                setNavBackground(show);
            }
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scroll({
            top: 0,
            behavior: "smooth",
        });
    };
    const setNewLocation = {
        pathname: '/',
        state: {
            clickOnLogo: true,
        },
    };
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(clearCategory());
        dispatch(handleSearchValue(''));
        history.push(setNewLocation);
    };
    const [open, setOpen] = React.useState(false);
    const node = React.useRef();
    useOnClickOutside(node, () => setOpen(false));

    return (
        <>
            <StyledTopContainer>
                <StyledMainImage icon={mainLogo} onClick={handleClick} />
            </StyledTopContainer>
            <StyledNavBar props={navBackground} ref={navRef}>
                <div ref={node}>
                    <Burger open={open} setOpen={setOpen} />
                    <Menu open={open} setOpen={setOpen} />
                </div>

                <StyledNavItem onClick={scrollToTop} props={navBackground}>
                    <StyledMainLogo icon={logo} />
                </StyledNavItem>
                <SearchInput secondary />
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
