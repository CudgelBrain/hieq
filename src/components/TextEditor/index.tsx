import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { Editor } from 'react-draft-wysiwyg';
import { Modal, Button } from 'react-bootstrap';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Controller } from 'react-hook-form';
import { AddMedia } from 'features/admin/faqQuestion/faqQuestionAPI';

interface Props {
  control: any;
  name: string;
  value: string;
  placeholder?: string;
  addMedia?: (file: FormData) => Promise<any>;
}

const TextEditor = React.forwardRef<HTMLFormElement, Props>(
  ({ control, name, value, placeholder }, ref) => {
    const [showSource, setShowSource] = useState<boolean>(false);
    const [convertedHTML, setConvertedHTML] = useState<string>('');
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const ShowEditorCode = () => (
      <div
        className='rdw-option-wrapper'
        onClick={() => {
          setShowSource(!showSource);
        }}
      >
        {showSource ? 'Hide' : 'Show'} Source
      </div>
    );

    const htmlToDraftConverter = (html: string) => {
      const contentBlock = htmlToDraft(html);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        setEditorState(EditorState.createWithContent(contentState));
      }
      setConvertedHTML(DOMPurify.sanitize(html));
    };

    useEffect(() => htmlToDraftConverter(value), [value]);

    const onHTMLEdit = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) =>
      htmlToDraftConverter(target.value);

    const uploadImageCallBack = (file: File) => {
      return new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('file', file);
        AddMedia(data)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    };

    return (
      <>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, ...fieldProps } }) => {
            const handleEditorChange = (editorState: EditorState) => {
              setEditorState(editorState);
              const htmlContent = DOMPurify.sanitize(
                draftToHtml(convertToRaw(editorState.getCurrentContent())),
              );
              onChange(htmlContent);
              setConvertedHTML(htmlContent);
            };
            return (
              <>
                <Editor
                  {...fieldProps}
                  placeholder={placeholder}
                  editorState={editorState}
                  editorClassName='editor-class'
                  wrapperClassName='wrapper-class'
                  toolbarClassName='toolbar-class'
                  toolbar={{
                    image: {
                      uploadCallback: uploadImageCallBack,
                      alt: { present: true, mandatory: true },
                    },
                  }}
                  onEditorStateChange={handleEditorChange}
                  toolbarCustomButtons={[<ShowEditorCode key={Math.random()} />]}
                />
              </>
            );
          }}
        />
        <Modal
          className='customModal'
          show={showSource}
          onHide={() => {
            setShowSource(false);
          }}
          backdrop='static'
        >
          <Modal.Header closeButton>
            <Modal.Title>Source Code</Modal.Title>
          </Modal.Header>
          <Modal.Body className='text-left'>
            <textarea value={convertedHTML} onChange={onHTMLEdit} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                setShowSource(false);
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  },
);

export default TextEditor;
