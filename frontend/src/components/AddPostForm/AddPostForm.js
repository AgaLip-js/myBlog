import { faCamera, faFont } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../validation/is-empty";
import { addContent, editContent, removeContent } from "../../redux/actions/contentAction";
import { addImage } from "../../redux/actions/imageAction";
import { addPost } from "../../redux/actions/postActions";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import InputImg from "../atoms/InputImg";
import SunEditorComponent from "../SunEditor/SunEditor";

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

const AddPostForm = () => {
    const { content } = useSelector(store => ({
        content: store.content.content,
    }));

    const [fileName, setFileName] = useState([]);
    const [mainPhoto, setMainPhoto] = useState([]);
    const contentArray = [];
    const [newContent, setNewContent] = useState(contentArray);
    const dispatch = useDispatch();
    const [selectedFile, setSelectedFile] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');
    const [succesMsg, setSuccesMsg] = useState('');

    // const [editorText, setEditorText] = useState(null);

    const handleAddNewContent = (type) => {
        const primaryContent = {
            type,
            object: "",
            id: uuidv4(),
        };
        setNewContent([...newContent, primaryContent]);
        dispatch(addContent(primaryContent));
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
    const postArray = {
        title: "",
        mainPhoto: '',
        content,
        category: "",
        id: uuidv4(),
        section: '',
    };

    const [newPost, setNewPost] = useState(postArray);

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

    return (
        <StyledContent>
            <StyledTitle> Dodaj Post </StyledTitle>
            <StyledAddForm>
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
                        && content.map((c, i) => c.type === "text" ? (
                            <StyledContainerText key={c.id}>
                                <SunEditorComponent editorChange={editorChange} id={c.id} initialContent="" />
                                <Button onClick={() => handleRemoveContent(c.id)}>Usuń pole</Button>
                            </StyledContainerText>
                        ) : (
                            <StyledContainerPhoto key={c.id}>
                                <InputImg name={c.id} fileName={fileName} setFileName={setFileName} setSelectedFile={setSelectedFile} selectedFile={selectedFile} i={i} setErrorMsg={setErrorMsg} />
                                <Button onClick={() => handleRemoveContent(c.id)}>Usuń zdjęcie</Button>
                            </StyledContainerPhoto>
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
                </StyledButtonWrapper>
                <Input secondary className="required" type="text" required="required" title="Kategoria postu" name="category" value={newPost.category} onChange={handleInputChange} />
                <StyledSelect onChange={handleInputChange} name="section">
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
