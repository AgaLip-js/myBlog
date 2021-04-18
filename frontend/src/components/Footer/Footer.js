import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const StyledFooterContainer = styled.footer`
    position: relative;
    left: 0;
    bottom: 0;
    width: 100%;
    height: fit-content;
    background: ${({ theme }) => theme.footerLightBlue};
    z-index: 1;
`;
const StyledFooterList = styled.div`
    display: flex;
    justify-content: center;
    list-style-type: none;
    align-items: center;
    color:${({ theme }) => theme.primaryTitle};
    padding-left: 0;
    font-size: 14px;
    margin: 0;
    padding: 0;

    @media (max-width: 760px) {
    display: flex;
    flex-direction: column;

    }
`;

const StyledTitle = styled.p`
    text-transform: capitalize;
    font-size: 16px;
    margin: 15px 10px;

`;

const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: ${({ theme }) => theme.primaryTitle};

    &:hover {
        color:${({ theme }) => theme.primaryText};
    }

`;
const StyledCopyrightWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    @media (max-width: 760px) {
    justify-content: center;

        p {
            margin-right:0 !important;
        }

    }

`;
const StyledCopywrightIcon = styled.span`
    font-size: 0.7rem;
`;

const Footer = () => (
    <StyledFooterContainer>
        <StyledFooterList>
            <StyledCopyrightWrapper>
                <StyledCopywrightIcon>
                    <FontAwesomeIcon icon={faCopyright} size="2x" />
                </StyledCopywrightIcon>
                <StyledTitle style={{
                    marginRight: '50px',
                }}
                >
                    Copyright 2020, Agata Lipiak - Zakoduj to
                </StyledTitle>
            </StyledCopyrightWrapper>
            <StyledTitle>
                <StyledLink to='/regulamin'>Regulamin Serwisu</StyledLink>
            </StyledTitle>
            <StyledTitle><StyledLink to='/polityka-prywatnosci'>Polityka Prywatności</StyledLink></StyledTitle>
            <StyledTitle><StyledLink to='/rodo'>Rodo</StyledLink></StyledTitle>
        </StyledFooterList>
    </StyledFooterContainer>
);

export default Footer;
