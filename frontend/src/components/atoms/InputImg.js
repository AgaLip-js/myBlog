import React, { useState } from "react";
import styled from "styled-components";
// import picture from "../../../../assets/pictures/default-img.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Axios from "axios";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/actions/imageAction";

const StyledImgWrapper = styled.div`
  position: relative;
  width: 300px;
  height: 150px;
  margin: 20px;
  border: 1px dotted ${({theme})=> theme.primaryBackground};
`;
const StyledInputImg = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
  text-align: center;
  :focus + label {
    background: ${({theme})=> theme.primaryBackground};
  }
`;
const StyledInputLabel = styled.label`
  cursor: pointer;
  text-transform: uppercase;
  max-height: 34px;
  max-width: 250px;
  overflow: hidden;
  font-size: 14px;
  border-radius: 5px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  color: #fff;
  border: solid 1px ${({theme})=> theme.borders};
  background: ${({theme})=> theme.primaryBackground};
  display: inline-block;
  z-index: 10;
  position: absolute;
  margin: 0;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  transition: all 0.2s linear;
  padding: 5px;
  cursor: pointer;
  :hover {
    background: ${({theme})=> theme.lightBackground};
    box-shadow: 0 3px 12px -1px rgba(7, 10, 25, 0.2), 0 22px 27px -20px rgba(7, 10, 25, 0.2);
  }
`;
const StyledImg = styled.img`
  opacity: 0.5;
`;
const StyledIconContainer = styled.button`
  position: absolute;
  z-index: 15;
  margin: 0;
  top: 50%;
  left: 93%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  padding: 5px;
  margin-left: 10px;
  height: 30px;
  font-size: 12px;
  cursor: pointer;
  border-radius: 5px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  color: #fff;
  border: solid 1px ${({theme})=> theme.borders};
  background: ${({theme})=> theme.primaryBackground};
`;

const InputImg = ({ name, fileName, setFileName, setSelectedFile, selectedFile }) => {
  const [fileURL, setfileURL] = useState("");
  const fileInput = React.useRef(null);

  const addToObject = function (obj, key, value, index) {

    // Create a temp object and index variable
    var temp = {};
    var i = 0;

    // Loop through the original object
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {

        // If the indexes match, add the new item
        if (i === index && key && value) {
          temp[key] = value;
        }

        // Add the current item in the loop to the temp obj
        temp[prop] = obj[prop];

        // Increase the count
        i++;

      }
    }

    // If no index, add to the end
    if (!index && key && value) {
      temp[key] = value;
    }

    return temp;

  };

  const addPhoto = (e) => {

if(selectedFile ) {
    const fileObject = addToObject(selectedFile, Object.keys(selectedFile).length, e.target.files[0]);
    const fileObjectWithLength = addToObject(fileObject, 'length', Object.keys(fileObject).length);
    setSelectedFile(fileObjectWithLength);
    } else {
      setSelectedFile(e.target.files);
    }
    console.log(selectedFile);

    const newPhoto=e.target.files[0].name;
    const newPhotoObject = [{
      title: newPhoto,
      id: name
    }]
    setFileName([...fileName, ...newPhotoObject]);
    console.log(fileName);
    const urlObject = URL.createObjectURL(fileInput.current.files[0]);
    setfileURL(urlObject);
  };
  const findID = fileName.find((fn)=> fn.id === name);

  const clearPhoto = (e) => {
    const clearFileName = fileName.filter((fn)=>fn.id !== name);
    console.log(clearFileName);
    fileInput.current.value = "";
    setFileName(clearFileName);
    setfileURL(null);
  };


  return (
    <StyledImgWrapper>
      <StyledInputImg
        type="file"
        id={name}
        name={name}
        accept="image/*"
        multiple
        onChange={addPhoto}
        ref={fileInput}
      />
      {findID && (
        <StyledIconContainer type="button" onClick={clearPhoto}>
          <FontAwesomeIcon icon={faTrash} />
        </StyledIconContainer>
      )}
      <StyledInputLabel htmlFor={name}>{findID ? findID.title : 'Wybierz zdjęcie'}</StyledInputLabel>
      {fileURL && (
        <StyledImg src={fileURL} width="300px" height="150px" />
      )}
    </StyledImgWrapper>
  );
};

export default InputImg;
