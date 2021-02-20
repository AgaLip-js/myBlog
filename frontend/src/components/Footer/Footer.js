import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { shallowEqual, useSelector } from 'react-redux';

const StyledFooterContainer = styled.footer`
  position: relative;
  left: 0;
  bottom: 0;
  width: 100%;
  height: fit-content;
  background: #5f7d95;
  z-index: 1;
`;
const StyledFooterList = styled.div`
  display: flex;
  justify-content: center;
  list-style-type: none;
  align-items: center;
  color: white;
  padding-left: 0;
  font-size: 14px;
  margin: 0;
  padding: 0;
`;

const StyledTitle = styled.p`
  text-transform: uppercase;
  font-size: 16px;
  margin: 15px;
`;
const StyledCopywrightIcon = styled.span``;

const Footer = () => {
    const { posts, loading } = useSelector(({ post }) => ({
        posts: post.posts,
        loading: post.loading,
    }), shallowEqual);

    return (
        !loading && posts.length
        && (
            <StyledFooterContainer>
                <StyledFooterList>
                    <StyledCopywrightIcon>
                        <FontAwesomeIcon icon={faCopyright} size="2x" />
                    </StyledCopywrightIcon>
                    <StyledTitle>Copyright 2020, Agata Lipiak</StyledTitle>
                </StyledFooterList>
            </StyledFooterContainer>
        )

    );
};

export default Footer;
