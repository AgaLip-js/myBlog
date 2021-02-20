import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import AddPostForm from "../components/AddPostForm/AddPostForm";
import { logoutUser } from "../redux/actions/authAction";
import store from "../redux/store/store";
import Button from '../components/atoms/Button';

const StyledWrapper = styled.div`
    position: relative;
    height: 100%;
    width: 90%;
    margin: 0 5%;
`;
const StyledLogout = styled(NavLink)`
    text-decoration: none;
    font-size: 18px;
    color: black;
    padding: 0 30px;
    font-weight: 700;
    position: relative;
`;
const StyledTitle = styled.span``;
const StyledHeader = styled.h2`
    margin-left: 10px;
`;
const StyledTopContent = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
const StyledContentWrapper = styled.div`
display: flex;
flex-direction: column;
`;
const StyledButtonWrapper = styled.div`
display: flex;
justify-content: center;
`;

const DashboardCMS = () => {
    const logoutFn = () => {
        store.dispatch(logoutUser());
    };

    const [option, setOption] = useState('add');

    return (
        <StyledWrapper>
            <StyledTopContent>
                <StyledHeader>Witaj Guninko w CMS </StyledHeader>
                <StyledLogout to="/login" onClick={logoutFn}>
                    <StyledTitle>Wyloguj się</StyledTitle>
                    <FontAwesomeIcon
                        icon={faSignOutAlt}
                        alt="Wyloguj Się"
                        style={{
                            marginLeft: "10px",
                        }}
                    />
                </StyledLogout>
            </StyledTopContent>
            <StyledContentWrapper>
                <StyledButtonWrapper>
                    <Button onClick={() => setOption('add')}>Dodaj Post</Button>
                    <Button onClick={() => setOption('edit')}>Edytuj Post</Button>
                </StyledButtonWrapper>
                <AddPostForm option={option} />
            </StyledContentWrapper>
        </StyledWrapper>
    );
};

export default DashboardCMS;
