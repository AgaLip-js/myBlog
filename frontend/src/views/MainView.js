import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleDown } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../components/atoms/Spinner";
import PostCard from "../components/PostCard/PostCard";
import { clearPosts, getPostsBySectionAndCategory, searchPosts, setPostLoadingAction, setPostLoadingMore } from "../redux/actions/postActions";
import Button from "../components/atoms/Button";
import circle from '../assets/Spin.svg';

const StyledWrapper = styled.div`
`;
const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledLoadMore = styled.h4`
    text-transform: uppercase;
    color: ${({ theme }) => theme.primaryBackground};
    cursor: pointer;
    width: fit-content;
    transition: all 0.3s ease;

    &:hover {
        color: ${({ theme }) => theme.lightBackground};
    }
`;

const MainView = ({ section, location }) => {
    const dispatch = useDispatch();

    const { posts, loading, start, count, loadingMore } = useSelector(({ post }) => ({
        posts: post.posts,
        loading: post.loading,
        start: post.start,
        count: post.count,
        loadingMore: post.loadingMore,
    }), shallowEqual);

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
    }), shallowEqual);

    const [loadMore, setLoadMore] = useState(false);

    useEffect(() => {
        if (!location) {
            dispatch(setPostLoadingAction());
            dispatch(getPostsBySectionAndCategory(section, category, {
                start: 1, count: 6,
            }));
        } else if (location.search) {
            dispatch(setPostLoadingAction());
            dispatch(searchPosts(
                location.search.substring(1),
                {
                    start: 1,
                    count: 6,
                },
            ));
        }
        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch, section, category, location]);

    useEffect(() => {
        if (loadMore) {
            if (!location) {
                dispatch(setPostLoadingMore());
                dispatch(getPostsBySectionAndCategory(section, category, {
                    start, count,
                }));
                setLoadMore(false);
            } else if (location.search) {
                dispatch(setPostLoadingMore());
                dispatch(searchPosts(
                    location.search.substring(1),
                    {
                        start,
                        count,
                    },
                ));
                setLoadMore(false);
            }
        }
    }, [start, count, loadMore]);

    if (loading && !posts.length) { return <Spinner />; }
    return (
        <StyledWrapper>
            {!loading && posts.length ? (
                <StyledCardContainer>
                    {/* <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchPosts}
                        hasMore
                        style={{
                            display: posts.length === 0 ? 'none' : 'flex', flexDirection: 'column',
                        }}
                    > */}
                    {posts.length && category === 'all categories'
                    && posts.map(post => (
                        <PostCard
                            id={post._id}
                            category={post.category}
                            date={post.date}
                            title={post.title}
                            content={post.content}
                            mainPhoto={post.mainPhoto}
                        />
                    ))}
                    {posts.length && category !== 'all categories'
                && posts.map(post => (post.category === category
                    && (
                        <PostCard
                            id={post._id}
                            category={post.category}
                            date={post.date}
                            title={post.title}
                            content={post.content}
                            mainPhoto={post.mainPhoto}
                        />
                    )
                ))}
                    {loadMore
                        ? (
                            <img
                                src={circle}
                                alt='circle-loading-spinner'
                                style={{
                                    width: '30px',
                                    height: '30px',
                                }}
                            />
                        ) : (
                            posts.length > 5
                            && (
                                <Button onClick={() => { setLoadMore(true); }}>
                                    Załaduj więcej

                                    <FontAwesomeIcon
                                        icon={faChevronCircleDown}
                                        style={{
                                            marginLeft: "10px",
                                        }}
                                    />

                                </Button>
                            )
                        )}
                </StyledCardContainer>
            ) : <p />}
            {(!loading && !posts.length) ? <p> Nie znaleziono postów pasujących do Twoich kryteriów. Spróbuj ponownie z innymi słowami kluczowymi. </p> : <p />}
        </StyledWrapper>

    );
};

export default MainView;
