import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm/LoginForm';

const StyledLoginWrapper = styled.div`
  position: relative;
  height: 60vh;
  display: flex;
  justify-content: center;
  width: 70%;
    align-items: center;
`;

const StyledLoginContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #b6cddf;
    height: fit-content;
`;


const PrivateLogin = () => {
  const { auth } = useSelector((store) => ({
    auth: store.auth,
  }));

  if (auth.isAuthenticated) {
    return <Redirect to="/admin-cms/dashboardCMS" />;
  }
  return (
    <StyledLoginWrapper>
      <StyledLoginContent>
        <LoginForm title="Zaloguj się" />
      </StyledLoginContent>
    </StyledLoginWrapper>
  );
};

export default PrivateLogin;
