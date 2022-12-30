import React, { useState, useEffect, useMemo } from 'react';
// import DOMPurify from 'dompurify';
// import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
// import { Editor } from 'react-draft-wysiwyg';
// import { Modal, Button } from 'react-bootstrap';
// import { EditorState, convertToRaw, ContentState } from 'draft-js';
// import { Controller } from 'react-hook-form';
// import { AddMedia } from 'features/admin/faqQuestion/faqQuestionAPI';
// import { config } from 'process';

// only for ckeditor 4--
// import { CKEditor } from 'ckeditor4-react';
import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';
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
  const config = useMemo(
    () => ({
      readonly: false,
      enableDragAndDropFileToEditor: true,
      // uploader: { url: "https://xdsoft.net/jodit/connector/index.php?action=fileUpload" }
      uploader: {
        insertImageAsBase64URI: true
      },
    }),
    []
  );
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
      <JoditReact config={config} onChange={(content) => valueChange(content)} defaultValue={value} />
      {/* only for ckeditor 4-- */}
      {/* <CKEditor
        initData={value}
        config={{
          extraPlugins: 'easyimage',
          removePlugins: 'image',
          cloudServices_uploadUrl: 'https://33333.cke-cs.com/easyimage/upload/',
          cloudServices_tokenUrl:
            'https://33333.cke-cs.com/token/dev/ijrDsqFix838Gh3wGO3F77FSW94BwcLXprJ4APSp3XQ26xsUHTi0jcb1hoBt'
        }}
        onChange={(editor) => {
          let data = editor.editor.getData()

          valueChange(data);
        }}
        onInstanceReady={() => {
        }}
      /> */}
    </>
  );
};


export default TextEditor;
