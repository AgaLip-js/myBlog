import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/atoms/Spinner";
import PostCard from "../components/PostCard/PostCard";
import { getPosts, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
    height: 100%;
    padding-top: 20px;
    width: 70%;
    padding-left: 10%;
    padding-right: 5%;
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

const Science = () => {
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(store => ({
        posts: store.post.posts,
        loading: store.post.loading,
    }));

    useEffect(() => {
        dispatch(setPostLoadingAction());
        dispatch(getPosts());
    }, [dispatch]);

    if (loading) { return <Spinner />; }

    return (
        <StyledWrapper>
            <StyledTitle>Artykuły</StyledTitle>
            <StyledCardContainer>
                {posts
                    && posts.map(post => (
                        post.section === 'Nauka'
                        && (
                            <>
                                <PostCard id={post._id} category={post.category} date={post.date} title={post.title} content={post.content} />
                            </>
                        )
                    ))}
            </StyledCardContainer>
        </StyledWrapper>
    );
};

export default Science;
