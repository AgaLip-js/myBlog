import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: ${({ props }) => (props ? "250px" : "100%")};
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: ${({ theme }) => theme.blackcolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.font500};
  line-height: inherit;
  transition: 0.3s ease;
`;
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 25px;
  margin-top: 5px;
  color: ${({ theme }) => theme.blackcolor};
  font-size: ${({ theme }) => theme.fontSize.xxs};
  font-weight: ${({ theme }) => theme.font500};
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: 0.2em;
`;
const StyledTextArea = styled.textarea`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 90%;
  height:50vh;
  border: 0;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 12px 20px;
  color: ${({ theme }) => theme.blackcolor};
  font-family: inherit;
  font-size: inherit;
  font-weight: ${({ theme }) => theme.font500};
  line-height: inherit;
  transition: 0.3s ease;
`

const Input = ({
    type,
    name,
    id,
    onChange,
    onBlur,
    value,
    title,
    secondary,
    required,
    textarea
  }) => {
    return (
  textarea ? (
    <>
        <StyledTextArea
         type={type}
         name={name}
         id={id}
         onChange={onChange}
         onBlur={onBlur}
         value={value}
         required={required}
        />
        <StyledLabel htmlFor={id}>{title}</StyledLabel>
        </>
      ): (
        <>
        <StyledInput
          type={type}
          name={name}
          id={id}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          props={secondary}
          required={required}
        />
        <StyledLabel htmlFor={id}>{title}</StyledLabel>
        </>
        )
    );
  };

  export default Input;
