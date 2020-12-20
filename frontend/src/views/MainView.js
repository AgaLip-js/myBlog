import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router'
import styled from 'styled-components'
import PostCard from '../components/PostCard/PostCard'
import { getPosts } from '../redux/actions/postActions'
import PostView from './PostView'

const StyledWrapper = styled.div`
height:100%;
padding-top: 20px;
width:70%;
padding-left:10%;
padding-right: 5%;
`
const StyledCardContainer = styled.div`
display:flex;
flex-direction:column;
`
const StyledTitle = styled.h2`
    letter-spacing: 1px;
    font-size: 32px;
    margin-top:0;
    margin-bottom:0;
    height: 60px;
    padding: 15px 0;
`

const MainView = () => {
const dispatch = useDispatch();
const { posts } = useSelector((store) => ({
    posts: store.post.posts,
  }));
  console.log(posts);

  useEffect(() => {
    dispatch(getPosts());
    }, [dispatch])

    return (
        <StyledWrapper>
            <StyledTitle>
                Aktualności
            </StyledTitle>
            <StyledCardContainer>
            {posts && posts.map((post)=>(
                <>
            <PostCard id={post._id} category={post.category} date={post.date} title={post.title} content={post.content}/>
            </>
            ))}
            </StyledCardContainer>
        </StyledWrapper>
    )
}

export default MainView
