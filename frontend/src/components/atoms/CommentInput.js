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
    font-family: 'Cabin';
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
    font-family: 'Cabin';
    height: 150px;
    resize: none;
`;

const CommentInput = ({ textArea, handleChange, value, name, ...props }) => {
    // const timeout = 400;
    // const isFirstRun = useRef(true);

    // useEffect(() => {
    //     const delayDebounceFn = setTimeout(() => {
    //         if (!isFirstRun.current) {
    //             handleChange(value, name);
    //         }
    //         if (isFirstRun.current) {
    //             isFirstRun.current = false;
    //         }
    //     }, timeout);

    //     return () => clearTimeout(delayDebounceFn);
    // }, [value]);

    if (textArea) {
        return <StyledCommentInputTextAreaComponent onChange={handleChange} value={value} name={name} {...props} />;
    }

    return <StyledCommentInputComponent onChange={handleChange} value={value} name={name} {...props} />;
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
