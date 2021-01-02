import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { getAllCategories, getCategoryForSection, setCategoryLoadingAction } from '../../redux/actions/categoryActions';
import { handleSearchValue, setSelectedCategory } from '../../redux/actions/globalActions';
import { getNewestPostsBySection } from '../../redux/actions/postActions';
import history from '../../templates/history';

const StyledContainer = styled.div`
    height:100%;
    width: 20%;
    display: flex;
    flex-direction: column;
    margin-right: 10%;
    position:absolute;
    right:0;
    padding: 20px;
    display:${({ location }) => (location === '/o-mnie' || location === '/admin-cms/login' || location === '/admin-cms/dashboardCMS') ? 'none' : 'block'};
    @media (max-width: 1200px) {
        display: none;
    }

`;
const StyledInputContainer = styled.div`
    position:relative;
    width:100%;
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
    width:100%;
    outline: none;
    display: block;
    border: 1px solid ${({ theme }) => theme.borders};
    border-radius:5px;
    box-sizing: border-box;
    padding: 12px 20px;

`;
const StyledAboutMeSection = styled.div`
    margin-top: 15px;
    border: 1px solid ${({ theme }) => theme.borders};
    padding: 15px;
    border-radius:5px;
    margin-bottom: 15px;
`;
const StyledTitle = styled.p`
    font-size: ${({ theme }) => theme.fontSize.m};

`;
const StyledText = styled.p`
    line-height:1.5;
`;
const StyledIconSection = styled.div``;
const StyledCategorySection = styled(StyledAboutMeSection)``;
const StyledNewPostsSection = styled(StyledAboutMeSection)``;
const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 100%;
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

const Rightbar = () => {
    const dispatch = useDispatch();
    const { loading, categories, newestPosts, post } = useSelector(store => ({
        categories: store.category.categories,
        loading: store.category.loading,
        newestPosts: store.post.newestPosts,
        post: store.post.post,
    }));

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
    }));

    const location = useLocation();

    useEffect(() => {
        // console.log(location.pathname);
        const pathName = location.pathname;

        if (!location.state && !pathName.match('/post/')) {
            dispatch(handleSearchValue(""));
            dispatch(setSelectedCategory('all categories'));
        }

        dispatch(setCategoryLoadingAction());

        dispatch(getAllCategories());
        dispatch(getNewestPostsBySection('mainView'));

        // returnAllCategoryArray();
    }, [dispatch, location]);

    // eslint-disable-next-line consistent-return
    const handleCategoryChange = (e) => {
        // setCategoryView(e.target.value);
        dispatch(setSelectedCategory(e.target.value));
        // but you can use a location instead

        const mainLocation = {
            pathname: '/',
            state: {
                fromPost: true,
            },
        };

        history.push(mainLocation);
        history.replace(mainLocation);
        return <Redirect to={mainLocation} />;
    };
    console.log(category);
    /**
     * Search field handler for posts. It updates the state on every keystroke.
     * @param {object} e - e.target
     * @returns {void}
   */
    const handleSearchField = (e) => {
        dispatch(handleSearchValue(e.target.value));
        // setSearchField(e.target.value);
    };

    return (
        <StyledContainer location={location.pathname}>
            <StyledInputContainer>
                <StyledSearchInput placeholder="Wyszukaj" onChange={handleSearchField} value={searchText} />
            </StyledInputContainer>

            <StyledAboutMeSection>
                <StyledTitle>
                    O blogu
                </StyledTitle>
                <StyledText>
                    Cześć, nazywam się Agata Lipiak i właśnie trafiłeś na mojego bloga o programowaniu w języku Javascript.
                    Celem bloga jest dzielenie się wiedzą, nowinkami z świata IT oraz pomoc osobom w rozwijaniu się w kierunku Front-end Developera.
                </StyledText>
                <br />
                <StyledTitle>
                    Facebook
                </StyledTitle>
                <StyledIconSection />
            </StyledAboutMeSection>
            <StyledCategorySection>
                <StyledTitle>Kategorie</StyledTitle>
                <StyledSelect onChange={handleCategoryChange} name="category" value={category}>
                    <StyledOption value="all categories">Wybierz kategorie</StyledOption>
                    {(categories && categories.length) && categories.map(cat => (
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
