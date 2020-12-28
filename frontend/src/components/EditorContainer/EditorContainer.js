import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState, convertFromRaw, convertFromHTML } from "draft-js";
import { convertToHTML } from 'draft-convert';
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';

function uploadImageCallBack(file) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "https://api.imgur.com/3/image");
        xhr.setRequestHeader("Authorization", "Client-ID XXXXX");
        const data = new FormData();
        data.append("image", file);
        xhr.send(data);
        xhr.addEventListener("load", () => {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
        });
        xhr.addEventListener("error", () => {
            const error = JSON.parse(xhr.responseText);
            reject(error);
        });
    });
}

class EditorContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // eslint-disable-next-line react/destructuring-assignment
            editorState: this.props.state ? this.props.state.object : EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState) => {
        const { editorChange, id, state } = this.props;
        this.setState({
            editorState,
        });

        const guni = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        const contentBlock = convertFromHTML(guni);
        const contentState = ContentState.createFromBlockArray(contentBlock);
        const editor = EditorState.createWithContent(contentState);
        editorChange(editorState, id);
    };

    render() {
        const { editorState } = this.state;
        const { readOnly, toolbarHidden, state } = this.props;
        console.log(state[0]);
        return (
            <div
                className="editor"
                style={{
                    backgroundColor: "white",
                }}
            >
                <Editor
                    editorState={editorState}
                    readOnly={readOnly}
                    onEditorStateChange={this.onEditorStateChange}
                    toolbarHidden={toolbarHidden}
                    toolbar={{
                        inline: {
                            inDropdown: true,
                        },
                        list: {
                            inDropdown: true,
                        },
                        textAlign: {
                            inDropdown: true,
                        },
                        link: {
                            inDropdown: true,
                        },
                        history: {
                            inDropdown: true,
                        },
                        image: {
                            uploadCallback: uploadImageCallBack,
                            alt: {
                                present: true,
                                mandatory: true,
                            },
                        },
                    }}
                />
            </div>
        );
    }
}
export default EditorContainer;
