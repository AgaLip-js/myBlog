import { faFrown, faGrinSquintTears, faHeart, faSmile, faThumbsUp, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { addReactionAction } from "../../redux/actions/commentActions";
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
    font-size: ${({ isThread }) => (isThread ? "14px" : "16px")};
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
    font-size: ${({ isThread }) => (isThread ? "12px" : "14px")};
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
        hour: "numeric",
        minute: "numeric",
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

const ReactionsMenu = ({ commentId, openPopover }) => {
    const dispatch = useDispatch();
    const handleReactionClick = (name) => {
        dispatch(addReactionAction(commentId, name));
        openPopover(false);
        // dispatch(simulateAddReaction());
    };
    return (
        <StyledReactionsMenu>
            {reactionTypes.map(({ name, color, icon }) => (
                <IconButton key={name} color={color} icon={icon} iconSize="2x" onClick={() => handleReactionClick(name)} />
            ))}
        </StyledReactionsMenu>
    );
};

const CommentReactions = ({ reactions }) => {
    const amount = reactions.reduce((psum, a) => psum + a.count, 0);

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
                if (count > 0) {
                    return (
                        <FontAwesomeIcon
                            key={name}
                            icon={reactionOb.icon}
                            color={reactionOb.color}
                            size="sm"
                            style={{
                                margin: "auto",
                            }}
                        />
                    );
                }
                return null;
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
const SingleComment = ({ postId, level, name, updateDate, commentText, reactions, _id, comments, isThread }) => {
    const [isPopoverVisible, openPopover] = useState(false);
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
                    <StyledCommentTitle>{name}</StyledCommentTitle>
                    <StyledDotSeparator />
                    <StyledSpan isThread={isThread}>{formatDate(new Date(updateDate))}</StyledSpan>
                </StyledTitleWrapper>
                <StyledCommentText isThread={isThread}>{commentText}</StyledCommentText>
                <StyledCommentFooter>
                    {reactions && reactions.length > 0 && (
                        <>
                            <CommentReactions reactions={reactions} />
                            <StyledDotSeparator />
                        </>
                    )}
                    <Popover option="click" showPopper={isPopoverVisible} setShowPopper={openPopover}>
                        <StyledSpan clickable ref={recommendRef} sizeType="headers" size="xxs" margin="auto 5px 1px auto">
                            Poleć
                        </StyledSpan>
                        <ReactionsMenu openPopover={openPopover} commentId={_id} />
                    </Popover>
                    <VerticalDivider />
                    <StyledSpan clickable isActive={toggleReplyVisible} onClick={() => setToogleReplyVisible(!toggleReplyVisible)}>
                        Odpowiedz
                    </StyledSpan>
                </StyledCommentFooter>
                {toggleReplyVisible && <AddNewCommentForm setToogleReplyVisible={setToogleReplyVisible} postId={postId} commentId={_id} />}
                {comments && comments.length > 0 && (
                    <StyledSubComments>
                        {comments.map(c => (
                            <SingleComment key={c.id} postId={postId} isThread level={level + 1} {...c} />
                        ))}
                    </StyledSubComments>
                )}
            </div>
        </StyleSingleCommentWrapper>
    );
};

SingleComment.propTypes = {
    isThread: PropTypes.bool,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    updateDate: PropTypes.string,
    commentText: PropTypes.string,
    reactions: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            count: PropTypes.number,
        }),
    ),
    comments: PropTypes.oneOfType([PropTypes.object]),
};

export default SingleComment;
