import React, { useEffect } from 'react';
import styled from 'styled-components';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import { getAllCategories } from '../../redux/actions/categoryActions';
import { clearCategory, handleSearchValue, setLoadingAction, setSelectedCategory } from '../../redux/actions/globalActions';
import { clearPosts, getNewestPostsBySection } from '../../redux/actions/postActions';
import history from '../../templates/history';
import SearchInput from '../atoms/SearchInput/SearchInput';

const StyledContainer = styled.div`
    /* height:100%; */
    width: 20%;
    display: flex;
    flex-direction: column;
    margin-right: 10%;
    position:absolute;
    right:0;
    padding: 20px;
    display:${({ location }) => (location === '/o-mnie' || location === '/admin-cms/login' || location === '/admin-cms/dashboardCMS') ? 'none' : 'inline-flex'};
    @media (max-width: 1200px) {
        display: none;
    }

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
    text-align: justify;
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

const StyledPostsContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;


`;

const StyledPostLink = styled(NavLink)`
color: #25313B;
text-decoration: none;
margin:10px 0;


&:hover {
    color: #5F7C94;
}
`;

const Rightbar = () => {
    const dispatch = useDispatch();
    const { categories, newestPosts } = useSelector(store => ({
        categories: store.category.categories,
        newestPosts: store.post.newestPosts,
    }), shallowEqual);

    const { category } = useSelector(({ common }) => ({
        category: common.category,
    }), shallowEqual);

    const location = useLocation();

    useEffect(() => {
        dispatch(getAllCategories());
        dispatch(getNewestPostsBySection('mainView'));
    }, [dispatch]);

    useEffect(() => {
        const pathName = location.pathname;

        if (!location.state && !pathName.match('/post/')) {
            dispatch(setLoadingAction());
            dispatch(clearCategory());
            dispatch(clearPosts());
            dispatch(handleSearchValue(''));
        }
    }, [location.state]);

    // eslint-disable-next-line consistent-return
    const handleCategoryChange = (e) => {
        dispatch(handleSearchValue(''));
        dispatch(setLoadingAction());
        dispatch(setSelectedCategory(e.target.value));
        dispatch(clearPosts());

        const mainLocation = {
            pathname: '/',
            state: {
                fromPost: true,
            },
        };

        history.push(mainLocation);
    };

    const path = id => `/post/${id}`;

    return (
        <StyledContainer location={location.pathname}>
            <SearchInput primary />
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
                <StyledPostsContainer>

                    {newestPosts && newestPosts.map(newPost => (
                        <StyledPostLink as={NavLink} to={path(newPost._id)} title={newPost.title}>
                            {newPost.title}
                        </StyledPostLink>
                    ))}

                </StyledPostsContainer>
            </StyledNewPostsSection>
        </StyledContainer>
    );
};

export default Rightbar;
