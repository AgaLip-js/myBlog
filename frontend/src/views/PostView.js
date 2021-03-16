/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/atoms/Spinner";
import ChallengeCard from "../components/ChallengeCard/ChallengeCard";
import Comments from "../components/Comments/Comments";
import { getImages, setImageLoadingAction } from "../redux/actions/imageAction";
import { clearPost, getPost, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
    min-height: 100vh;
    padding-top: 20px;
    width: 70%;
    padding-left: 15%;
    padding-right: 10%;
    padding-bottom: 80px;
    line-height: 1.5;
`;
const StyledHeader = styled.h2`
    letter-spacing: 1px;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 0;
    height: 60px;
    padding: 15px 0;
`;

const StyledImg = styled.img`
    max-width: 100%;
`;

const StyledContainerForContent = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    border-bottom: 1px solid ${({ theme }) => theme.borders};
    padding-bottom: 20px;
`;
const StyledContentHTML = styled.div`
    width: 100%;
`;

const PostView = ({ match }) => {
    const dispatch = useDispatch();
    const { post, images, loadingImg, loadingPost } = useSelector(store => ({
        post: store.post.post,
        images: store.image.images,
        loadingImg: store.image.loading,
        loadingPost: store.post.loading,
    }));

    useEffect(() => {
        dispatch(setPostLoadingAction());
        dispatch(setImageLoadingAction());
        dispatch(getPost(match.params.id));
        dispatch(getImages());

        return () => {
            dispatch(clearPost());
        };
        // eslint-disable-next-line
    }, [dispatch, match.params.id]);

    const getImgUrl = image => images.filter(img => img.name === image);

    return (
        <StyledWrapper>
            {(loadingImg || loadingPost || !post.content || !images.length > 0) && <Spinner />}
            <StyledHeader>{post.title}</StyledHeader>

            <StyledContainerForContent>
                {images.length && post.content
                    && post.content.map(c => c.type === "text" ? (
                    // eslint-disable-next-line react/no-danger
                        <StyledContentHTML
                            key={c.id}
                            dangerouslySetInnerHTML={{
                                __html: c.object,
                            }}
                        />
                    ) : c.type === 'img' && c.object !== "" ? (
                        <StyledImg src={`${getImgUrl(c.object)[0].url}`} key={c.id} />
                    ) : (
                        <p />
                    ))}
                <ChallengeCard
                    content={post.content && post.content.filter(c => c.type === "challenge")}
                />
            </StyledContainerForContent>
            <Comments postId={post._id} />
        </StyledWrapper>
    );
};

export default PostView;
