import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getComments } from "../../redux/actions/commentActions";
import AddNewCommentForm from "./AddNewCommentForm";
import SingleComment from "./SingleComment";

const StyledComentsWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
`;

const StyledUserCommentsList = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 15px;
`;

const StyledCommentsHeader = styled.h2`
    font-size: 22px;
`;

const Comments = ({ postId }) => {
    const { comments } = useSelector(({ post }) => ({
        comments: post.comments,
    }));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getComments(postId));
    }, [dispatch, postId]);

    return (
        <StyledComentsWrapper>
            <StyledCommentsHeader>
                Komentarze
            </StyledCommentsHeader>
            <AddNewCommentForm postId={postId} />
            <StyledUserCommentsList>
                {comments.map(c => (
                    <SingleComment postId={postId} key={c._id} level={1} {...c} />
                ))}
            </StyledUserCommentsList>
        </StyledComentsWrapper>
    );
};

export default Comments;
