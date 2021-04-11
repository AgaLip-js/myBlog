import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MainView from "./MainView";

const StyledWrapper = styled.div`
    min-height: 1100px;
    padding-top: 20px;
    width: 70%;
    padding-left: 10%;
    padding-right: 3%;
    padding-bottom: 20px;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const StyledTitle = styled.h2`
    letter-spacing: 1px;
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 0;
    height: 60px;
    padding: 15px 0;
`;

const Search = ({ location }) => (
    <StyledWrapper>
        {location.search !== ''
            && (
                <StyledTitle>
                    {' '}
                    {`Wyniki wyszukiwania dla: ${location.search.substring(1)}`}
                </StyledTitle>
            )}
        <MainView location={location} />
    </StyledWrapper>
);

export default Search;
