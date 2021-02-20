import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from "../components/atoms/Spinner";
import PostCard from "../components/PostCard/PostCard";
import { clearPosts, getPostsBySectionAndCategory, searchPosts, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
`;
const StyledCardContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const MainView = ({ section }) => {
    const dispatch = useDispatch();

    const { posts, loading, start, count } = useSelector(({ post }) => ({
        posts: post.posts,
        loading: post.loading,
        start: post.start,
        count: post.count,
    }), shallowEqual);

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
    }), shallowEqual);

    const fetchPosts = () => {
        if (!searchText) {
            dispatch(getPostsBySectionAndCategory(section, category, {
                start, count,
            }));
        } else if (searchText) {
            dispatch(searchPosts(
                {
                    searchText,
                    start,
                    count,
                },
            ));
        }
    };

    useEffect(() => {
        if (!searchText) {
            dispatch(setPostLoadingAction());
            dispatch(getPostsBySectionAndCategory(section, category, {
                start: 1, count: 5,
            }));
        } else if (searchText) {
            dispatch(setPostLoadingAction());
            dispatch(searchPosts(

                {
                    searchText,
                    start: 1,
                    count: 5,
                },
            ));
        }

        return () => {
            dispatch(clearPosts());
        };
    }, [dispatch, section, category, searchText]);

    if (loading && !posts.length) { return <Spinner />; }
    return (
        <StyledWrapper>
            {!loading && posts.length ? (
                <StyledCardContainer>
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchPosts}
                        hasMore
                        style={{
                            display: posts.length === 0 ? 'none' : 'flex', flexDirection: 'column',
                        }}
                    >
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
                    </InfiniteScroll>
                </StyledCardContainer>
            ) : <p />}
            {(!loading && !posts.length) ? <p> Nie znaleziono postów pasujących do Twoich kryteriów. Spróbuj ponownie z innymi słowami kluczowymi. </p> : <p />}
        </StyledWrapper>

    );
};

export default MainView;
