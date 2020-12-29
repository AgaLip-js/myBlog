import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { getCategory, setCategoryLoadingAction } from '../../redux/actions/categoryActions';

const StyledContainer = styled.div`
height:100%;
width: 20%;
display: flex;
flex-direction: column;
margin-right: 10%;
position:absolute;
right:0;
padding: 20px;

`;
const StyledInputContainer = styled.div`
position:relative;
width:250px;
  @media (max-width: 550px) {

    margin-right: 10px;
  }
  @media (max-width: 350px) {

    margin-right: 5px;
  }

`;
const StyledButtonIcon = styled.button`
position:absolute;
top:0;
right:0;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme.primaryBackground};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
  border: none;
  :hover {
    background: ${({ theme }) => theme.lightBackground};

  }
  :active {
    color:${({ theme }) => theme.lightBackground};
  }
`;
const StyledSearchInput = styled.input`
width:250px;
outline: none;
display: block;
border: 1px solid ${({ theme }) => theme.borders};
  border-radius:5px 28px 28px 5px;
  box-sizing: border-box;
  padding: 12px 20px;

`;
const StyledAboutMeSection = styled.div`
margin-top: 15px;
border: 1px solid ${({ theme }) => theme.borders};
padding:20px;
border-radius:5px;
margin-bottom: 15px;
`;
const StyledTitle = styled.p`
font-size: ${({ theme }) => theme.fontSize.m};

`;
const StyledText = styled.p`
line-height:1.5;
`;
const StyledIconSection = styled.div`

`;
const StyledCategorySection = styled(StyledAboutMeSection)``;
const StyledNewPostsSection = styled(StyledAboutMeSection)``;
const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 250px;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 5px 5px;
  color: ${({ theme }) => theme.blackcolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.font500};
  line-height: inherit;
  transition: 0.3s ease;
  font-size: 14px;
  border: 1px solid ${({ theme }) => theme.borders};
`;
const StyledOption = styled.option``;

const SearchIcon = {
    color: "#fff",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontSize: "18px",
};

const Rightbar = ({ setCategoryView }) => {
    const dispatch = useDispatch();
    const { category } = useSelector(store => ({
        category: store.category.category,
    }));

    useEffect(() => {
        dispatch(setCategoryLoadingAction());
        dispatch(getCategory());
    }, [dispatch]);

    const returnAllCategoryArray = () => {
        let categoryArray = [];

        if (category.articles) { categoryArray = [...categoryArray, ...category.articles]; }
        if (category.science) { categoryArray = [...categoryArray, ...category.science]; }
        if (category.noSection) { categoryArray = [...categoryArray, ...category.noSection]; }

        return Array.from(new Set(categoryArray));
    };

    const handleCategoryChange = (e) => {
        setCategoryView(e.target.value);
    };

    return (
        <StyledContainer>
            <StyledInputContainer>
                <StyledSearchInput placeholder="Wyszukaj" />
                <StyledButtonIcon type="button">
                    <FontAwesomeIcon icon={faSearch} style={SearchIcon} />
                </StyledButtonIcon>
            </StyledInputContainer>

            <StyledAboutMeSection>
                <StyledTitle>
                    {' '}
                    O blogu
                </StyledTitle>
                <StyledText>
                    Cześć, nazywam się Agata Lipiak i właśnie trafiłeś na mojego bloga o programowaniu w języku Javascript.
                    Celem bloga jest dzielenie się wiedzą, nowinkami z świata IT oraz pomoc osobom w rozwijaniu się w kierunku Front-end Developera.
                    {' '}
                </StyledText>
                <br />
                <StyledTitle>
                    {' '}
                    Facebook
                </StyledTitle>
                <StyledIconSection />
            </StyledAboutMeSection>
            <StyledCategorySection>
                <StyledTitle>Kategorie</StyledTitle>
                <StyledSelect onChange={handleCategoryChange} name="section">
                    <StyledOption value="Wszystkie Kategorie">Wszystkie Kategorie</StyledOption>
                    {returnAllCategoryArray().map(cat => (
                        <StyledOption value={cat}>
                            {cat}
                        </StyledOption>
                    ))}
                </StyledSelect>
            </StyledCategorySection>
            <StyledNewPostsSection>
                <StyledTitle>Najnowsze wpisy</StyledTitle>
            </StyledNewPostsSection>
        </StyledContainer>
    );
};

export default Rightbar;
