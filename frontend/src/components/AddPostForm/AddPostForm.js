import { faCamera, faCode, faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../validation/is-empty";
import { addContent, editContent, removeContent } from "../../redux/actions/contentAction";
import { addImage } from "../../redux/actions/imageAction";
import { addPost, clearPost, getPost } from "../../redux/actions/postActions";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import InputImg from "../atoms/InputImg";
import SunEditorComponent from "../SunEditor/SunEditor";
import SelectPosts from "../atoms/SelectPosts";

const StyledContent = styled.div`
    display: flex;
    flex-direction: column;
    background: ${({ theme }) => theme.borders};
`;
const StyledTitle = styled.p`
    font-size: 18px;
    text-align: center;
    font-weight: bold;
`;
const StyledAddForm = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledContainerText = styled.div`
    width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px;
    line-height: 1.2;
`;
const StyledContainerPhoto = styled(StyledContainerText)`
    width: fit-content;
`;
const StyledButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0px 35px 0px;
`;
const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 10px 0px 35px 0px;
`;
const StyledContainerForContent = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;
const StyledError = styled.p`
color: red;
text-align: center;
`;
const StyledSucces = styled.p`
color: green;
text-align: center;
`;
const StyledSelect = styled.select`
  outline: none;
  display: block;
  background: ${({ theme }) => theme.lightcolor};
  width: 250px;
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
const StyledOption = styled.option``;
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
const StyledSectionTitle = styled.h4`

`;

const AddPostForm = ({ option }) => {
    const { content, post } = useSelector(store => ({
        content: store.content.content,
        post: store.post.post,
    }));

    const [selectedPost, setSelectedPost] = useState(null);
    const [fileName, setFileName] = useState([]);
    const [mainPhoto, setMainPhoto] = useState([]);
    const contentArray = post.content ? post.content : [];
    const [newContent, setNewContent] = useState(contentArray);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [succesMsg, setSuccesMsg] = useState('');

    const postArray = {
        title: post.title ? post.title : "",
        mainPhoto: post.mainPhoto ? post.mainPhoto : '',
        content: post.content ? post.content : content,
        category: post.category ? post.category : "",
        id: uuidv4(),
        section: post.section ? post.section : '',
    };
    const [newPost, setNewPost] = useState(postArray);

    useEffect(() => {
        setNewPost(postArray);
        setNewContent(contentArray);
    }, [post]);

    // const [editorText, setEditorText] = useState(null);

    const handleAddNewContent = (type) => {
        let primaryContent;
        let secondaryContent;

        if (type === 'challenge') {
            primaryContent = {
                type,
                object: "",
                id: uuidv4(),
            };
            secondaryContent = {
                type,
                object: "",
                id: uuidv4(),
            };
            setNewContent([...newContent, primaryContent, secondaryContent]);
            dispatch(addContent(primaryContent));
        } else {
            primaryContent = {
                type,
                object: "",
                id: uuidv4(),
            };
            setNewContent([...newContent, primaryContent]);
            dispatch(addContent(primaryContent));
        }
    };

    const handleRemoveContent = (id) => {
        dispatch(removeContent(id));
        setNewContent(
            newContent.filter((c) => {
                if (c.id === id) {
                    return null;
                }
                return c;
            }),
        );
        setFileName(fileName.filter(fn => fn.id !== id));
    };

    const handleInputChange = (e) => {
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setNewContent(
            newContent.map((c) => {
                if (c.type === "img" && fileName.length) {
                    const findFileName = fileName.find(fn => fn.id === c.id);
                    return {
                        ...c,
                        object: findFileName ? findFileName.title : "",
                    };
                }
                return c;
            }),
        );

        dispatch(editContent(newContent));

        // eslint-disable-next-line
    }, [fileName, setFileName]);

    const uploadPhotos = () => {
        if (selectedFile) {
            const emptyArray = [];
            emptyArray.push(selectedFile);
            setSelectedFile(emptyArray);
            const data = new FormData();
            for (let x = 0; x < selectedFile.length; x++) {
                data.append("file", selectedFile[x]);
            }
            data.append("file", selectedFile);
            dispatch(addImage(data));
            setSelectedFile(null);
        }
    };

    const addNewPost = () => {
        if (isEmpty(newPost.title)) {
            setErrorMsg('Title is empty !');
        } else if (isEmpty(newPost.category)) {
            setErrorMsg('Category is empty !');
        } else if (!newContent.find(nc => nc.object.trim())) {
            setErrorMsg('Content is empty !');
        } else if (isEmpty(newPost.section)) {
            setErrorMsg('Section is empty !');
        } else if (!mainPhoto.length) {
            setErrorMsg('Choose main photo !');
        } else {
            uploadPhotos();

            dispatch(addPost({
                ...newPost,
                mainPhoto,
                content: newContent,
            }));
            setErrorMsg('');
            setSuccesMsg('The post has been added !');
            setNewContent(contentArray);
            setNewPost(postArray);
        }
    };

    const editorChange = (objectContent, id) => {
        setNewContent(
            newContent.map((c) => {
                if (c.id === id) {
                    return {
                        ...c,
                        object: objectContent,
                    };
                }
                return c;
            }),
        );

        dispatch(editContent(newContent));
    };

    const handlePostChange = (e) => {
        dispatch(getPost(e.target.value));
        setSelectedPost(e.target.value);
    };

    return (
        <StyledContent>
            <StyledTitle>
                {' '}
                {option === 'add' ? 'Dodaj Post' : 'Edytuj Post'}
                {' '}
            </StyledTitle>
            <StyledAddForm>
                {option === 'edit'
                && <SelectPosts handlePostChange={handlePostChange} />}
                <Input secondary className="required" type="text" required="required" title="Tytuł postu" name="title" value={newPost.title} onChange={handleInputChange} />

                <InputImg
                    name='Main Photo'
                    fileName={mainPhoto}
                    setFileName={setMainPhoto}
                    setSelectedFile={setSelectedFile}
                    selectedFile={selectedFile}
                    setErrorMsg={setErrorMsg}
                />
                <StyledLabel htmlFor='Main Photo'>Zdjęcie główne</StyledLabel>
                <StyledContainerForContent>
                    {content
                        // eslint-disable-next-line no-nested-ternary
                        && content.map((c, i) => c.type === "text" ? (
                            <StyledContainerText key={c.id}>
                                <StyledSectionTitle>Pole Tekstowe</StyledSectionTitle>
                                <SunEditorComponent editorChange={editorChange} id={c.id} initialContent="" />
                                <Button onClick={() => handleRemoveContent(c.id)}>Usuń pole</Button>
                            </StyledContainerText>
                        ) : c.type === "img" ? (
                            <StyledContainerPhoto key={c.id}>
                                <StyledSectionTitle>Zdjęcie/ Obrazek</StyledSectionTitle>
                                <InputImg name={c.id} fileName={fileName} setFileName={setFileName} setSelectedFile={setSelectedFile} selectedFile={selectedFile} i={i} setErrorMsg={setErrorMsg} />
                                <Button onClick={() => handleRemoveContent(c.id)}>Usuń zdjęcie</Button>
                            </StyledContainerPhoto>
                        ) : (
                            <StyledContainerText key={c.id}>
                                <StyledSectionTitle>Wyzwanie</StyledSectionTitle>
                                <SunEditorComponent editorChange={editorChange} id={c.id} initialContent="" />
                                <Button onClick={() => handleRemoveContent(c.id)}>Usuń wyzwanie</Button>
                            </StyledContainerText>
                        ))}
                </StyledContainerForContent>

                <StyledButtonWrapper>
                    <Button onClick={() => handleAddNewContent("text", "")}>
                        Dodaj tekst
                        <FontAwesomeIcon
                            icon={faFont}
                            style={{
                                marginLeft: "20px",
                            }}
                        />
                    </Button>
                    <Button onClick={() => handleAddNewContent("img", "")}>
                        Dodaj zdjęcie
                        <FontAwesomeIcon
                            icon={faCamera}
                            style={{
                                marginLeft: "20px",
                            }}
                        />
                    </Button>
                    <Button onClick={() => handleAddNewContent("challenge", "")}>
                        Dodaj wyzwanie
                        <FontAwesomeIcon
                            icon={faCode}
                            style={{
                                marginLeft: "20px",
                            }}
                        />
                    </Button>
                </StyledButtonWrapper>
                <Input secondary className="required" type="text" required="required" title="Kategoria postu" name="category" value={newPost.category} onChange={handleInputChange} />
                <StyledSelect onChange={handleInputChange} name="section" value={newPost.section}>
                    <StyledOption hidden selected>Select section...</StyledOption>
                    <StyledOption value='artykuly'>
                        Artykuły
                    </StyledOption>
                    <StyledOption value='nauka'>
                        Nauka
                    </StyledOption>
                    <StyledOption value='inne'>
                        Inne
                    </StyledOption>
                </StyledSelect>
                <StyledLabel>Sekcja</StyledLabel>

            </StyledAddForm>
            <StyledButtonContainer>
                <Button onClick={addNewPost}>Dodaj Post</Button>
                <Button onClick={uploadPhotos}>Dodaj zdjęcia</Button>
            </StyledButtonContainer>
            {errorMsg
                ? <StyledError>{errorMsg}</StyledError>
                : null}
            {succesMsg
                ? <StyledSucces>{succesMsg}</StyledSucces>
                : null}
        </StyledContent>
    );
};

export default AddPostForm;
