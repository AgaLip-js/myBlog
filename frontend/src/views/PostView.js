import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import SunEditorComponent from "../components/SunEditor/SunEditor";
import { getImages } from "../redux/actions/imageAction";
import { getPost } from "../redux/actions/postActions";

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
    justify-content: center;
    flex-wrap: wrap;
`;

const PostView = ({ match }) => {
    const dispatch = useDispatch();
    const { post, images, loading } = useSelector(store => ({
        post: store.post.post,
        images: store.image.images,
        loading: store.image.loading,
    }));

    useEffect(() => {
        dispatch(getPost(match.params.id));
        dispatch(getImages());
        // eslint-disable-next-line
    }, [dispatch, match.params.id]);

    const getImgUrl = image => images.filter(img => img.name === image);

    return (
        <StyledWrapper>
            <StyledHeader>{post.title}</StyledHeader>

            <StyledContainerForContent>
                {post.content && !loading && post.content.map(c => (c.type === "text"
                    ? (
                        // eslint-disable-next-line react/no-danger
                        <div dangerouslySetInnerHTML={{
                            __html: c.object,
                        }}
                        />
                    )
                    : (<StyledImg src={`${getImgUrl(c.object)[0].url}`} />)))}
            </StyledContainerForContent>
        </StyledWrapper>
    );
};

export default PostView;
