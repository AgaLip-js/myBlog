import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "../components/atoms/Spinner";
import PostCard from "../components/PostCard/PostCard";
import { clearPosts, getPosts, getPostsByCategory, setPostLoadingAction } from "../redux/actions/postActions";

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

const MainView = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(store => ({
        posts: store.post.posts,
        loading: store.post.loading,
    }));

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
    }));

    const [count, setCount] = useState(5);
    const [start, setStart] = useState(1);
    const location = useLocation();

    const fetchPosts = () => {
        setStart(start + count);
        dispatch(getPosts((start + count, count)));
    };

    useEffect(() => {
        dispatch(setPostLoadingAction());
        dispatch(getPosts({
            start, count,
        }));

        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch]);
    console.log(posts);
    if (loading || !posts.length) { return <Spinner />; }
    return (
        <StyledWrapper>
            {category === 'all categories'
                ? <StyledTitle>Aktualności</StyledTitle>
                : <StyledTitle>{category}</StyledTitle>}
            <StyledCardContainer>
                <InfiniteScroll
                    dataLength={posts.length}
                    next={fetchPosts}
                    hasMore
                >
                    {posts.length && category === 'all categories'
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
                    {posts.length && category !== 'all categories'
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
                </InfiniteScroll>
            </StyledCardContainer>
        </StyledWrapper>

    );
};

export default MainView;
