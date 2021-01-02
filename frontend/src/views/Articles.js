import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/atoms/Spinner";
import PostCard from "../components/PostCard/PostCard";
import { clearPosts, getPosts, getPostsBySection, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
    height: 100%;
    padding-top: 20px;
    width: 70%;
    padding-left: 10%;
    padding-right: 3%;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;
const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledTitle = styled.h2`
    letter-spacing: 1px;
    font-size: 32px;
    margin-top: 0;
    margin-bottom: 0;
    height: 60px;
    padding: 15px 0;
`;

const Articles = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(store => ({
        posts: store.post.posts,
        loading: store.post.loading,
    }));

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
    }));

    useEffect(() => {
        dispatch(setPostLoadingAction());
        dispatch(getPostsBySection('artykuly', category));
        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch, category]);

    if (loading || !posts.length) { return <Spinner />; }

    return (
        <StyledWrapper>
            <StyledTitle>Artykuły</StyledTitle>
            <StyledCardContainer>
                {posts && category === 'all categories'
                    && posts.map(post => (searchText !== ''
                        ? post.title.match(searchText) && (
                            <PostCard
                                id={post._id}
                                category={post.category}
                                date={post.date}
                                title={post.title}
                                content={post.content}
                            />
                        ) : (
                            <PostCard
                                id={post._id}
                                category={post.category}
                                date={post.date}
                                title={post.title}
                                content={post.content}
                            />
                        )
                    ))}
                {posts && category !== 'all categories'
                && posts.map(post => (post.category === category
                    && (searchText !== '' ? post.title.match(searchText)
                        && (
                            <PostCard
                                id={post._id}
                                category={post.category}
                                date={post.date}
                                title={post.title}
                                content={post.content}
                            />
                        )
                        : (
                            <PostCard
                                id={post._id}
                                category={post.category}
                                date={post.date}
                                title={post.title}
                                content={post.content}
                            />
                        ))
                ))}
            </StyledCardContainer>
        </StyledWrapper>
    );
};

export default Articles;
