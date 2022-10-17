import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Modal, Button } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Controller } from 'react-hook-form';
import { AddMedia } from 'features/admin/faqQuestion/faqQuestionAPI';
import { CKEditor } from 'ckeditor4-react';
interface Props {
  control?: any;
  name?: string;
  value?: string;
  placeholder?: string;
  addMedia?: (file: FormData) => Promise<any>;
  register?: any;
  valueChange?: any;
}

const TextEditor = ({ valueChange, value }: Props) => {
  // ({ control, name, value, placeholder }, ref) => {
  //   const [showSource, setShowSource] = useState<boolean>(false);
  //   const [convertedHTML, setConvertedHTML] = useState<string>('');
  //   const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  //   const ShowEditorCode = () => (
  //     <div
  //       className='rdw-option-wrapper'
  //       onClick={() => {
  //         setShowSource(!showSource);
  //       }}
  //     >
  //       {showSource ? 'Hide' : 'Show'} Source
  //     </div>
  //   );

  //   const htmlToDraftConverter = (html: string) => {
  //     const contentBlock = htmlToDraft(html);
  //     if (contentBlock) {
  //       const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
  //       setEditorState(EditorState.createWithContent(contentState));
  //     }
  //     setConvertedHTML(DOMPurify.sanitize(html));
  //   };

  //   useEffect(() => htmlToDraftConverter(value), [value]);

  //   const onHTMLEdit = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) =>
  //     htmlToDraftConverter(target.value);

  //   const uploadImageCallBack = (file: File) => {
  //     return new Promise((resolve, reject) => {
  //       const data = new FormData();
  //       data.append('file', file);
  //       AddMedia(data)
  //         .then((res) => {
  //           resolve(res);
  //         })
  //         .catch((err) => {
  //           reject(err);
  //         });
  //     });
  //   };

  return (
    <>
      <CKEditor
        initData={value}
        onChange={(editor) => {
          let data = editor.editor.getData()

          valueChange(data);
        }}
        onInstanceReady={() => {
        }}
      />
    </>
  );
};


export default TextEditor;
