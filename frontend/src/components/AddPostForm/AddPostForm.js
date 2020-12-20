import { faCamera, faFont, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addImage } from '../../redux/actions/imageAction'
import Button from '../atoms/Button'
import Input from '../atoms/Input'
import InputImg from '../atoms/InputImg'
import { v4 as uuidv4 } from 'uuid';
import { addContent, removeContent, editContent} from '../../redux/actions/contentAction'
import EditorContainer from '../EditorContainer/EditorContainer'

const StyledContent = styled.div`
display:flex;
flex-direction: column;
background:${({theme})=> theme.borders};
`
const StyledTitle = styled.p`
font-size: 18px;
text-align: center;
font-weight:bold;
`
const StyledAddForm = styled.div`
 display: flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
`
const StyledContainerText = styled.div`
    width: 70vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 10px;
    line-height:1.2;
`
const StyledContainerPhoto = styled(StyledContainerText)`
width: fit-content;
`
const StyledButtonWrapper = styled.div`
display:flex;
justify-content: center;
margin: 10px 0px 35px 0px;
`
const StyledButtonContainer = styled.div`
display:flex;
justify-content:center;
margin: 10px 0px 35px 0px;
`
const StyledContainerForContent = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`

const AddPostForm = () => {

 const [fileName, setFileName] = useState([]);
 const { content} = useSelector((store) => ({
    content: store.content.content,
  }));
  const contentArray = [];
const [newContent, setNewContent] = useState(contentArray)
const dispatch = useDispatch();
const [selectedFile, setSelectedFile] = useState(null);

const handleAddNewContent =(type)=>{
    const primaryContent = {
        type: type,
        object:'',
        id: uuidv4(),
    }
    setNewContent([...newContent, primaryContent]);
    dispatch(addContent(primaryContent));
}
const handleRemoveContent = (id)=>{
    dispatch(removeContent(id));
        setNewContent(newContent.filter((c)=>{
            if(c.id===id){
                return null
            } else {
                return c
            }
        }));
setFileName(fileName.filter((fn)=> fn.id !== id));
console.log(fileName);
}
console.log(newContent);
const postArray = {
    title:"",
    content: content,
    category: "",
    id: uuidv4(),
}

const [newPost, setNewPost] = useState(postArray);

const handleInputChange = (e) => {
    setNewPost({
      ...newPost,
      [e.target.name]: e.target.value,
    });
  };
  console.log(newPost);

  const handleContentChange = (e, content)=>{
      setNewContent(newContent.map((c)=>{
          if(c.id===content.id){
              return {
                  ...c,
                  [e.target.name]: e.target.value,
              }
          } else {
              return c
          }
      })
      );
    dispatch(editContent(newContent));
    }
    useEffect(() => {

    setNewContent(newContent.map((c)=>{
     if(c.type==='img' && fileName.length){
        const findFileName = fileName.find((fn)=>fn.id===c.id)
      return {
       ...c,
       object : findFileName ? findFileName.title : '',
      }
      } else {
       return c
       }
    })
    );
     dispatch(editContent(newContent));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileName, setFileName])

const addNewPost = ()=>{
    newContent.map((c) => {
        if(c.type==='img' && fileName.length) {
            const file = {
                orginalname: c.object
            }
           dispatch(addImage(file));
        }
    })

setNewPost({...newPost, content: newContent});

}

const uploadPhotos = ()=> {
    let emptyArray=[];
    emptyArray.push(selectedFile);
    setSelectedFile(emptyArray);
    const data = new FormData();
    for(var x = 0; x<selectedFile.length; x++) {
      data.append('file', selectedFile[x])
  }
  console.log(data);
  console.log(selectedFile);
    data.append('file', selectedFile)
    dispatch(addImage(data));
    setSelectedFile(null);
  }
    return (
 <StyledContent>
<StyledTitle> Dodaj Post </StyledTitle>
<StyledAddForm>
<Input
secondary
className="required"
type="text"
required="required"
title="Tytuł postu"
name="title"
value={newPost.title}
onChange={handleInputChange}
/>
<StyledContainerForContent>
{content && (
    content.map((c,i) => (
    c.type==='text' ? (
        <StyledContainerText key={c.id}>
        {/* <Input
        textarea
        className="required"
        type="text"
        required="required"
        title="Opis postu"
        name="object"
        value={newContent.object}
        id={c.id}
        onChange={(e)=>handleContentChange(e, c)}
        /> */}
        <EditorContainer/>
        <Button onClick={()=>handleRemoveContent(c.id)}>
            Usuń pole
        </Button>
        </StyledContainerText>
    ) : (
        <StyledContainerPhoto key={c.id}>
        <InputImg
        name={c.id}
        fileName={fileName}
        setFileName={setFileName}
        setSelectedFile={setSelectedFile}
        selectedFile={selectedFile}
        i={i}
        />
        <Button onClick={()=>handleRemoveContent(c.id)}>
         Usuń zdjęcie
         </Button>
        </StyledContainerPhoto>
    )
    ))
)
}
</StyledContainerForContent>

<StyledButtonWrapper>
<Button onClick={()=>handleAddNewContent('text', '')}>
    Dodaj tekst
<FontAwesomeIcon icon={faFont} style={({marginLeft: '20px'})}/>
</Button>
<Button onClick={()=>handleAddNewContent('img', '')}>
    Dodaj zdjęcie
<FontAwesomeIcon icon={faCamera} style={({marginLeft: '20px'})}/>
</Button>
</StyledButtonWrapper>
<Input
    secondary
    className="required"
    type="text"
    required="required"
    title="Kategoria postu"
    name="category"
    value={newPost.category}
    onChange={handleInputChange}
/>
</StyledAddForm>
<StyledButtonContainer>
<Button onClick={addNewPost}>Dodaj Post</Button>
<Button onClick = {uploadPhotos}>Dodaj zdjęcia</Button>
</StyledButtonContainer>
</StyledContent>
)
}

export default AddPostForm
