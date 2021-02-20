import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Spinner from "../components/atoms/Spinner";
import Comments from "../components/Comments/Comments";
import { getImages, setImageLoadingAction } from "../redux/actions/imageAction";
import { clearPost, getPost, setPostLoadingAction } from "../redux/actions/postActions";

const StyledWrapper = styled.div`
    min-height: 100vh;
    padding-top: 20px;
    width: 70%;
    padding-left: 15%;
    padding-right: 10%;
    padding-bottom: 20px;
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

    if (loadingImg || loadingPost || !post || !images) {
        return <Spinner />;
    }
    return (
        <StyledWrapper>
            <StyledHeader>{post.title}</StyledHeader>

            <StyledContainerForContent>
                {post.content
                    // eslint-disable-next-line no-nested-ternary
                    && post.content.map(c => c.type === "text" ? (
                    // eslint-disable-next-line react/no-danger
                        <StyledContentHTML
                            key={c.id}
                            dangerouslySetInnerHTML={{
                                __html: c.object,
                            }}
                        />
                    ) : c.object !== "" ? (
                        <StyledImg src={`${getImgUrl(c.object)[0].url}`} key={c.id} />
                    ) : (
                        <p />
                    ))}
            </StyledContainerForContent>
            <Comments postId={post._id} />
        </StyledWrapper>
    );
};

export default PostView;
