import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/atoms/Spinner";
import Comments from "../components/Comments/Comments";
import { getImages, setImageLoadingAction } from "../redux/actions/imageAction";
import { getPost, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
    height: 100%;
    padding-top: 20px;
    width: 70%;
    padding-left: 15%;
    padding-right: 10%;
`;
const StyledHeader = styled.h2`
    letter-spacing: 1px;
    font-size: 28px;
    margin-top: 0;
    margin-bottom: 0;
    height: 60px;
    padding: 15px 0;
`;
const StyledText = styled.p`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: justify;
    line-height: 1.2;
`;
const StyledImg = styled.img`
    max-width: 100%;
`;

const StyledContainerForContent = styled.div`
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    text-align: justify;
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
        console.log("Loading indicator");
        dispatch(setPostLoadingAction());
        dispatch(setImageLoadingAction());
        setTimeout(() => {
            console.log("Loading post");
            dispatch(getPost(match.params.id));
            dispatch(getImages());
        }, 500);

        // eslint-disable-next-line
    }, [dispatch, match.params.id]);

    const getImgUrl = image => images.filter(img => img.name === image);
    console.log("Loading");
    console.log(loadingImg);
    console.log(loadingPost);

    if (loadingImg || loadingPost) {
        return <Spinner />;
    }

    return (
        <StyledWrapper>
            <StyledHeader>{post.title}</StyledHeader>

            <StyledContainerForContent>
                {/* eslint-disable-next-line no-nested-ternary */}
                {post.content
                    && post.content.map(c => c.type === "text" ? (
                    // eslint-disable-next-line react/no-danger
                        <StyledContentHTML
                            dangerouslySetInnerHTML={{
                                __html: c.object,
                            }}
                        />
                    ) : c.object !== "" ? (
                        <StyledImg src={`${getImgUrl(c.object)[0].url}`} />
                    ) : null)}
            </StyledContainerForContent>
            <Comments />
        </StyledWrapper>
    );
};

export default PostView;
