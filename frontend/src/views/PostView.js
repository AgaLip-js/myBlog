import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import styled from "styled-components";
import LoadingSpinner from "../components/atoms/LoadingSpinner";
import Spinner from "../components/atoms/Spinner";

import SunEditorComponent from "../components/SunEditor/SunEditor";
import { setSelectedCategory } from "../redux/actions/globalActions";
import { getImages, setImageLoadingAction } from "../redux/actions/imageAction";
import { clearPost, getPost, setPostLoadingAction } from "../redux/actions/postActions";
import history from "../templates/history";

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
width:100%;
`;
const PostView = ({ match }) => {
    const dispatch = useDispatch();
    const { post, images, loadingImg, loadingPost } = useSelector(store => ({
        post: store.post.post,
        images: store.image.images,
        loadingImg: store.image.loading,
        loadingPost: store.post.loading,
    }));

    const { category, searchText } = useSelector(({ common }) => ({
        category: common.category,
        searchText: common.searchText,
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

    if (loadingImg || loadingPost || !post || !images) { return <Spinner />; }

    // if (category !== 'all categories' || searchText !== '') {
    //     const mainLocation = {
    //         pathname: '/',
    //         state: {
    //             fromDashboard: true,
    //         },
    //     };

    //     history.push(mainLocation);
    //     history.replace(mainLocation);
    //     return <Redirect to={mainLocation} />;
    // }

    return (
        <StyledWrapper>
            <StyledHeader>{post.title}</StyledHeader>

            <StyledContainerForContent>
                {/* eslint-disable-next-line no-nested-ternary */}
                {post.content && post.content.map(c => (c.type === "text"
                    ? (
                        // eslint-disable-next-line react/no-danger
                        <StyledContentHTML dangerouslySetInnerHTML={{
                            __html: c.object,
                        }}
                        />
                    )
                    : (
                        c.object !== ''
                            ? <StyledImg src={`${getImgUrl(c.object)[0].url}`} />
                            : null
                    )))}
            </StyledContainerForContent>
        </StyledWrapper>

    );
};

export default PostView;
