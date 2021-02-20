import React, { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getPosts, setPostLoadingAction } from '../../redux/actions/postActions';
import Spinner from './Spinner';

const StyledWrapper = styled.div`
text-align: center;
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

const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 350px;
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
  font-size: 14px;
`;
const StyledOption = styled.option`
`;

const SelectPosts = ({ handlePostChange }) => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPostLoadingAction());
        dispatch(getPosts());
    }, []);

    const { posts, loading } = useSelector(({ post }) => ({
        posts: post.posts,
        loading: post.loading,
    }), shallowEqual);

    return (
        !loading && posts.length > 0 ? (
            <StyledWrapper>
                <StyledSelect id="editPost" name="editPost" onChange={e => handlePostChange(e)}>
                    <StyledOption hidden selected>Select post...</StyledOption>
                    {posts.map(post => (
                        <StyledOption value={post._id} key={post._id}>{post.title}</StyledOption>
                    ))}
                    <StyledOption />
                </StyledSelect>
                <StyledLabel htmlFor="editPost">Wybierz post do edycji</StyledLabel>
            </StyledWrapper>
        )
            : (
                <Spinner />
            )
    );
};

export default SelectPosts;
