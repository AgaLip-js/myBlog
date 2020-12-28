import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Button from "../atoms/Button";
import CommentInput from "../atoms/CommentInput";
import StyledDotSeparator from "../atoms/StyledDotSeparator";
import VerticalDivider from "../atoms/VerticalDivider";

const StyledComentsWrapper = styled.section`
    width: 100%;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
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
    display: flex;
    flex-direction: column;
`;

const StyledUserCommentsList = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContinueAsGuest = styled.div`
    display: flex;
    flex-direction: column;
    row-gap: 5px;
`;

const StyleSingleCommentWrapper = styled.div`
    display: grid;
    width: 100%;
    column-gap: 10px;
    grid-template-columns: auto 1fr;
`;

const StyledCommentTitle = styled.span`
    color: #5f7d95;
`;

const StyledTitleWrapper = styled.span``;

const StyledCommentText = styled.p`
    margin: 0;
    font-size: 16px;
`;

const StyledCommentFooter = styled.span`
    margin-left: auto;
    justify-content: flex-end;
    display: flex;
    font-size: 14px;
    column-gap: 6px;
`;

const StyledSpan = styled.span`
    cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
    color: #bdbcbc;
`;

const Comments = ({ isThread }) => {
    const dispatch = useDispatch();
    const [commentText, setCommentText] = useState("");
    const [name, setName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");

    const isKnownUser = false;

    const handleButtonClick = () => {
        console.log("should be disabled");
    };

    const handleNameAndCheckIfAlreadyExists = (v) => {
        setName(v);
    };

    return (
        <StyledComentsWrapper>
            <span>
                <CommentInput type="text" name="commentText" value={commentText} handleChange={v => setCommentText(v)} title="" placeholder="Dodaj nowy komentarz..." />
            </span>
            <StyledUserInfo>
                <SignInBySocialNetworkWrapper>
                    <span>Zaloguj się za pomocą:</span>
                    <FontAwesomeIcon icon={["fab", "google"]} />
                    <FontAwesomeIcon icon={["fab", "facebook"]} />
                </SignInBySocialNetworkWrapper>
                <ContinueAsGuest>
                    <span>Kontynuuj jako gość</span>
                    <CommentInput type="text" name="name" value={name} handleChange={v => handleNameAndCheckIfAlreadyExists(v)} title="" placeholder="Wpisz swoje imię..." />
                    <CommentInput type="text" name="emailAddress" value={emailAddress} handleChange={v => setEmailAddress(v)} title="" placeholder="Wpisz swój email (opcjonalnie)..." />
                </ContinueAsGuest>
            </StyledUserInfo>
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
            <StyledUserCommentsList>
                <StyleSingleCommentWrapper>
                    <FontAwesomeIcon
                        icon={faUser}
                        size="4x"
                        style={{
                            border: "1px solid lightgray",
                            padding: "0 5px",
                            background: "#5f7d95",
                            color: "white",
                        }}
                    />
                    <div>
                        <StyledTitleWrapper>
                            <StyledCommentTitle>Nazwa użytkownika</StyledCommentTitle>
                            <StyledDotSeparator />
                            <StyledSpan>miesiąc temu</StyledSpan>
                        </StyledTitleWrapper>
                        <StyledCommentText>
                            The standard Lorem Ipsum passage, used since the 1500s &ldquo;Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
                            magna aliqua.
                        </StyledCommentText>
                        <StyledCommentFooter>
                            <StyledSpan clickable>Poleć</StyledSpan>
                            <VerticalDivider />
                            <StyledSpan clickable>Odpowiedz</StyledSpan>
                        </StyledCommentFooter>
                    </div>
                </StyleSingleCommentWrapper>
            </StyledUserCommentsList>
        </StyledComentsWrapper>
    );
};

Comments.propTypes = {
    isThread: PropTypes.bool,
};
Comments.defaultProps = {
    isThread: "false",
};

export default Comments;
