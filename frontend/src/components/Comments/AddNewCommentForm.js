// import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addComment, addReply } from "../../redux/actions/commentActions";
import Button from "../atoms/Button";
import CommentInput from "../atoms/CommentInput";

const StyledAddNewCommentForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    margin-top: 10px;
`;

const StyledUserInfo = styled.div`
    display: grid;
    grid-template-columns: auto auto;
`;

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: right;
    width: 100%;
`;

const SignInBySocialNetworkWrapper = styled.div`
    display: none;
    flex-direction: column;
    width: max-content;
`;

const ContinueAsGuest = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`;

const AddNewCommentForm = ({ postId, commentId, setToogleReplyVisible }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const isKnownUser = false;

    const clearState = () => {
        setCommentText('');
        setName('');
        setEmailAddress('');
    };

    const handleButtonClick = () => {
        const commentData = {
            name,
            commentText,
            user: "GUEST",
        };

        if (commentId) {
            dispatch(addReply(postId, commentId, commentData));
            setToogleReplyVisible(false);
            clearState();
        } else {
            dispatch(addComment(postId, commentData));
            clearState();
        }
    };

    return (
        <StyledAddNewCommentForm>
            <StyledUserInfo>
                <SignInBySocialNetworkWrapper>
                    {/* <span>Zaloguj się za pomocą:</span> */}
                    <div
                        style={{
                            padding: "10px",
                            display: "flex",
                            columnGap: "10px",
                            justifyContent: "center",
                        }}
                    >
                        {/* <FontAwesomeIcon icon={faGoogle} size="3x" color="#DB4437" />
                        <FontAwesomeIcon icon={faFacebook} size="3x" color="#4267B2" /> */}
                    </div>
                </SignInBySocialNetworkWrapper>
                <ContinueAsGuest>
                    <span />
                    <CommentInput type="text" name="name" value={name} handleChange={e => setName(e.target.value)} title="" placeholder="Wpisz swoje imię..." />
                    <CommentInput type="text" name="emailAddress" value={emailAddress} handleChange={e => setEmailAddress(e.target.value)} title="" placeholder="Wpisz swój email (opcjonalnie)..." />
                </ContinueAsGuest>
            </StyledUserInfo>
            <span>
                <CommentInput type="text" name="commentText" textArea value={commentText} handleChange={e => setCommentText(e.target.value)} title="" placeholder="Dodaj nowy komentarz..." />
            </span>
            <StyledButtonContainer>
                <Button
                    style={{
                        marginLeft: "auto",
                        height: "40px",
                    }}
                    onClick={handleButtonClick}
                    disabled={isKnownUser}
                >
                    Dodaj komentarz
                </Button>
            </StyledButtonContainer>
        </StyledAddNewCommentForm>
    );
};

export default AddNewCommentForm;
