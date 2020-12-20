import React from 'react'
import styled from 'styled-components';
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { logoutUser } from '../redux/actions/authAction';
import store from '../redux/store/store';
import Button from '../components/atoms/Button';
import AddPostForm from '../components/AddPostForm/AddPostForm';



const StyledWrapper = styled.div`
position:relative;
height:100%;
width:70%;
`
const StyledLogout = styled(NavLink)`
  text-decoration: none;
  font-size: 18px;
  color: black;
  padding: 0 30px;
  font-weight: 700;
  position:relative;
`;
const StyledTitle = styled.span`
`
const StyledHeader = styled.h2`
margin-left:10px;
`
const StyledTopContent = styled.div`
display:flex;
justify-content:space-between;
align-items:center;
`
const DashboardCMS = () => {

  const logoutFn = () => {
    store.dispatch(logoutUser());
    };

    return (
        <StyledWrapper>
          <StyledTopContent>
            <StyledHeader>Witaj Guninko w CMS </StyledHeader>
                  <StyledLogout to="/login" onClick={logoutFn}>
                    <StyledTitle>Wyloguj się</StyledTitle>
                  <FontAwesomeIcon icon={faSignOutAlt} alt={"Wyloguj Się"} style={({marginLeft:'10px'})}/>
                </StyledLogout>
          </StyledTopContent>
            <AddPostForm/>
        </StyledWrapper>
    )
}

export default DashboardCMS
