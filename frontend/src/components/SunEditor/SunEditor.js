
import React, { useRef, useEffect, useState } from "react";
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import './SunEditor.css';

const SunEditorComponent = ({ initialContent, editorChange, id, hide, disable, showController, showToolbar }) => {
    const editorRef = useRef();
    const [content, setContent] = useState(initialContent);

    useEffect(() => {
        if (editorChange) {
            editorChange(content, id);
        }
    }, [content]);

    return (
        <div>
            <SunEditor
                ref={editorRef}
                setContents={initialContent}
                onChange={setContent}
                autoFocus
                width="1000px"
                height="150px"
                setOptions={{
                    buttonList: [
                        // default
                        ["undo", "redo"],
                        ["fontSize", "fontColor", "formatBlock"],
                        ["bold", "underline", "italic", "list"],
                        ["table", "link", "image"],
                        ["fullScreen"],
                    ],
                }}
                hide={hide}
                disable={disable}
                showController={showController}
                showToolbar={showToolbar}
            />
        </div>
    );
};
export default SunEditorComponent;
