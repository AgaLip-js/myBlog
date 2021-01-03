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

const commentsOb = [
    {
        id: 1,
        userName: "Pan ktośiek",
        commentText:
            "The standard Lorem Ipsum passage, used since the 1500s &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        updateDate: new Date(),
        reactions: [
            {
                name: "Like",
                count: 20,
            },
            {
                name: "Laught",
                count: 10,
            },
        ],
        subComments: [
            {
                id: 2,
                userName: "Pan Guninośiek",
                commentText: "The standard Lorem Ipsum passage, used since the 1500s &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te.",
                updateDate: new Date(),
                reactions: [
                    {
                        name: "Like",
                        count: 0,
                    },
                    {
                        name: "Laught",
                        count: 10,
                    },
                ],
                subComments: [
                    {
                        id: 3,
                        userName: "Pan Guninośiek",
                        commentText: "The standard Lorem Ipsum passage, used since the 1500s &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te.",
                        updateDate: new Date(-100),
                        reactions: [
                            {
                                name: "Like",
                                count: 20,
                            },
                            {
                                name: "Laught",
                                count: 10,
                            },
                        ],
                        subComments: [],
                    },
                    {
                        id: 4,
                        userName: "Pan Guninośiek",
                        commentText: "The standard Lorem Ipsum passage, used since the 1500s &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod te.",
                        updateDate: new Date(),
                        reactions: [
                            {
                                name: "Like",
                                count: 20,
                            },
                            {
                                name: "Laught",
                                count: 10,
                            },
                        ],
                        subComments: [],
                    },
                ],
            },
        ],
    },
];

const Comments = ({ postId }) => {
    const { comments } = useSelector(({ post }) => ({
        comments: post.comments,
    }));

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getComments(postId));
    }, [dispatch]);

    return (
        <StyledComentsWrapper>
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
