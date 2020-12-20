import React from "react";
import { Formik } from "formik";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Input from "../atoms/Input";
import Button from "../atoms/Button";
import { loginUser } from "../../redux/actions/authAction";

const StyledForm = styled.form`
    position: relative;
    background: ${({ theme }) => theme.whitecolor};
    width: 500px;
    border-radius: 4px;
    box-shadow: 0 0 30px rgba(black, 0.1);
    box-sizing: border-box;
    padding: 40px;
    overflow: hidden;
`;
const StyledTitle = styled.h2`
    margin-bottom: 20px;
`;
const StyledFormControl = styled.div`
    margin: 20px 0;
`;

const LoginForm = ({ title }) => {
    const dispatch = useDispatch();

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
                const user = {
                    email: values.email,
                    password: values.password,
                };

                dispatch(loginUser(user));
                setSubmitting(false);
            }}
        >
            {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <StyledForm onSubmit={handleSubmit}>
                    <StyledTitle>{title}</StyledTitle>
                    <StyledFormControl>
                        <Input type="email" name="email" id="email" onChange={handleChange} onBlur={handleBlur} value={values.email} htmlFor="email" title="Email" />
                        <Input type="password" name="password" id="password" onChange={handleChange} onBlur={handleBlur} value={values.password} htmlFor="password" title="Hasło" />
                    </StyledFormControl>
                    <Button type="submit" disabled={isSubmitting}>
                        Zatwiedź
                    </Button>
                </StyledForm>
            )}
        </Formik>
    );
};

export default LoginForm;
