import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import MainView from "./MainView";

const StyledWrapper = styled.div`
    min-height: 1100px;
    padding-top: 20px;
    padding-bottom: 20px;
    width: 70%;
    padding-left: 10%;
    padding-right: 3%;

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

const News = () => {
    const { category, section, searchText } = useSelector(({ common }) => ({
        category: common.category,
        section: common.section,
        searchText: common.searchText,
    }));

    return (
        <StyledWrapper>
            {category === 'all categories' && section === 'mainView'
            && searchText === ''
                && <StyledTitle>Aktualności</StyledTitle> }
            {category !== 'all categories' && section === 'mainView'
            && searchText === '' && <StyledTitle>{category}</StyledTitle> }
            <MainView section="mainView" />
        </StyledWrapper>
    );
};

export default News;
