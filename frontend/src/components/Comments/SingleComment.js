import { faFrown, faGrinSquintTears, faHeart, faSmile, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import IconButton from "../atoms/IconButton";
import Popover from "../atoms/Popover";
import StyledDotSeparator from "../atoms/StyledDotSeparator";
import VerticalDivider from "../atoms/VerticalDivider";
import AddNewCommentForm from "./AddNewCommentForm";

const StyleSingleCommentWrapper = styled.div`
    display: grid;
    width: 100%;
    column-gap: 10px;
    grid-template-columns: auto 1fr;
`;
const StyledSubComments = styled.div`
    font-size: 13px;
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
    color: ${({ isActive }) => (isActive ? "#0076f1" : "#bdbcbc")};
`;

const StyledReactionsMenu = styled.div`
    display: flex;
    justify-content: center;
    > * {
        transition: all 0.4s;
        :hover {
            transform: scale(1.25) translateY(-18%);
        }
    }
`;

const formatDate = (date) => {
    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };

    if (date.getFullYear() !== new Date().getFullYear()) {
        return date.toLocaleDateString("pl", options);
    }

    delete options.year;

    return date.toLocaleDateString("pl", options);
};

const reactionTypes = [
    {
        name: "Like",
        color: "#0076f1",
        icon: faThumbsUp,
    },
    {
        name: "Heart",
        color: "#ea3545",
        icon: faHeart,
    },
    {
        name: "Smile",
        color: "orange",
        icon: faSmile,
    },
    {
        name: "Laught",
        color: "#0faaf1",
        icon: faGrinSquintTears,
    },
    {
        name: "Sad",
        color: "gray",
        icon: faFrown,
    },
];

const ReactionsMenu = () => (
    <StyledReactionsMenu>
        {reactionTypes.map(({ name, color, icon }) => (
            <IconButton key={name} color={color} icon={icon} iconSize="2x" />
        ))}
    </StyledReactionsMenu>
);

const CommentReactions = ({ reactions }) => {
    const amount = reactions.reduce((psum, a) => psum + a.count, 0);

    console.log("reactions:");
    return (
        <div
            style={{
                display: "flex",
                columnGap: "5px",
                justifyContent: "center",
            }}
        >
            {reactions.map(({ name, count }) => {
                const reactionOb = reactionTypes.find(el => el.name === name);
                return <FontAwesomeIcon icon={reactionOb.icon} color={reactionOb.color} size="sm" />;
            })}
            <span>{amount}</span>
        </div>
    );
};
CommentReactions.propTypes = {
    reactions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            count: PropTypes.number,
        }),
    ),
};
const SingleComment = ({ level, userName, updateDate, commentText, reactions, id, subComments }) => {
    const [restartPopover, setRestartPopover] = useState(false);
    const recommendRef = useRef(null);
    const [toggleReplyVisible, setToogleReplyVisible] = useState(false);

    return (
        <StyleSingleCommentWrapper>
            <FontAwesomeIcon
                icon={faUser}
                size="4x"
                style={{
                    border: "1px solid lightgray",
                    padding: "0 5px",
                    background: "#5f7d95",
                    borderRadius: "10px",
                    color: "white",
                }}
            />
            <div>
                <StyledTitleWrapper>
                    <StyledCommentTitle>{userName}</StyledCommentTitle>
                    <StyledDotSeparator />
                    <StyledSpan>{formatDate(updateDate)}</StyledSpan>
                </StyledTitleWrapper>
                <StyledCommentText>{commentText}</StyledCommentText>
                <StyledCommentFooter>
                    {reactions && reactions.length > 0 && (
                        <>
                            <CommentReactions reactions={reactions} />
                            <StyledDotSeparator />
                        </>
                    )}
                    <Popover option="click" showPopper={restartPopover} setShowPopper={setRestartPopover}>
                        <StyledSpan clickable ref={recommendRef} sizeType="headers" size="xxs" margin="auto 5px 1px auto">
                            Poleć
                        </StyledSpan>
                        <ReactionsMenu />
                    </Popover>
                    <VerticalDivider />
                    <StyledSpan clickable isActive={toggleReplyVisible} onClick={() => setToogleReplyVisible(!toggleReplyVisible)}>
                        Odpowiedz
                    </StyledSpan>
                </StyledCommentFooter>
                {subComments && subComments.length > 0 && (
                    <StyledSubComments>
                        {subComments.map(c => (
                            <SingleComment key={c.id} isThread level={level + 1} {...c} />
                        ))}
                    </StyledSubComments>
                )}
                {toggleReplyVisible && <AddNewCommentForm />}
            </div>
        </StyleSingleCommentWrapper>
    );
};

SingleComment.propTypes = {
    isThread: PropTypes.bool,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    updateDate: PropTypes.instanceOf(Date),
    commentText: PropTypes.string,
    reactions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            count: PropTypes.number,
        }),
    ),
    subComments: PropTypes.arrayOf(
        PropTypes.shape({
            isThread: PropTypes.bool,
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            name: PropTypes.string,
            updateDate: PropTypes.date,
            commentText: PropTypes.string,
            reactions: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string,
                    count: PropTypes.number,
                }),
            ),
        }),
    ),
};
SingleComment.defaultProps = {
    isThread: false,
};

export default SingleComment;
