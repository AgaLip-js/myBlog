import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledCommentInputComponent = styled.input`
    width: 100%;
    outline: none;
    display: block;
    border: 1px solid ${({ theme }) => theme.borders};
    border-radius: 5px 5px 5px 5px;
    box-sizing: border-box;
    padding: 12px 20px;
`;
const StyledCommentInputTextAreaComponent = styled.textarea`
    max-width: 100%;
    width: 100%;
    outline: none;
    display: block;
    border: 1px solid ${({ theme }) => theme.borders};
    border-radius: 5px 5px 5px 5px;
    box-sizing: border-box;
    padding: 12px 20px;
`;

const CommentInput = ({ textArea, handleChange, value, name, ...props }) => {
    const timeout = 400;
    const isFirstRun = useRef(true);
    const [text, setText] = useState("");

    const handleSearch = (event) => {
        setText(event.target.value);
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (!isFirstRun.current) {
                handleChange(text, name);
            }
            if (isFirstRun.current) {
                isFirstRun.current = false;
            }
        }, timeout);

        return () => clearTimeout(delayDebounceFn);
    }, [text]);

    if (textArea) {
        return <StyledCommentInputTextAreaComponent onChange={handleSearch} value={text} name={name} {...props} />;
    }

    return <StyledCommentInputComponent onChange={handleSearch} value={text} name={name} {...props} />;
};

CommentInput.propTypes = {
    handleChange: PropTypes.func,
    value: PropTypes.string,
    name: PropTypes.string,
    textArea: PropTypes.bool,
};

CommentInput.defaultProps = {
    textArea: false,
};

export default CommentInput;
