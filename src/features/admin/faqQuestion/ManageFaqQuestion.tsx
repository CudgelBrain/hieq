import React, { KeyboardEventHandler, useState, useEffect, useMemo } from 'react';
import { isEmpty } from 'lodash';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import DOMPurify from 'dompurify';
import { Modal, Button } from 'react-bootstrap';
import CreatableSelect, { OnChangeValue } from 'react-select';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  FaqQuestionForm,
  FaqQuestionSchema,
  OptionType,
  FaqQuestion,
  addFaqQuestion,
  editFaqQuestion,
} from './faqQuestionSlice';
import { AddMedia } from './faqQuestionAPI';
import { listFaqSubjects } from 'features/admin/faqSubject/faqSubjectSlice';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

interface Props {
  status: string | number;
  message: string;
  faqQuestion?: FaqQuestion;
  actionType: string;
  onComplete?: () => void;
}

const createOption = (label: string) => ({
  label,
  value: label,
});

const ManageQuestionAnswer: React.FC<Props> = ({
  status,
  message,
  faqQuestion,
  actionType,
  onComplete,
}) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState<string>('');
  const [tagvalue, setTagValue] = useState<OptionType[]>([]);
  const [topics, setTopics] = useState<{ name: string }[]>([]);
  const [showSource, setShowSource] = useState<boolean>(false);
  const [convertedHTML, setConvertedHTML] = useState<string>('');
  const {
    reset,
    control,
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqQuestionForm>({
    defaultValues: useMemo(() => faqQuestion, [faqQuestion]),
    resolver: yupResolver(FaqQuestionSchema),
  });
  const { subjects } = useAppSelector((state: RootState) => state.faqSubject);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  useEffect(() => {
    dispatch(listFaqSubjects());
  }, [dispatch]);

  const handleOnComplete = () => {
    reset();
    setInputValue('');
    setTagValue([]);
    EditorState.createEmpty();
    onComplete && onComplete();
  };

  const htmlToDraftConverter = (html: string) => {
    let editorState;
    const contentBlock = htmlToDraft(html);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      editorState = EditorState.createWithContent(contentState);
    } else editorState = EditorState.createEmpty();
    setEditorState(editorState);
    setConvertedHTML(DOMPurify.sanitize(html));
  };

  useEffect(() => {
    if (faqQuestion && actionType === 'edit') {
      if (!isEmpty(subjects)) {
        const value = faqQuestion.subject.split('::');
        setTopics(subjects[value[0]].topics);
        reset({
          ...getValues(),
          topic: faqQuestion.topic,
          subject: faqQuestion.subject,
        });
      }
      htmlToDraftConverter(faqQuestion?.answer);
      setTagValue(faqQuestion?.tags.map((tag) => createOption(tag)));
    }
  }, [faqQuestion, actionType, subjects, reset, getValues]);

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

  const onHTMLEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    htmlToDraftConverter(e.target.value);

  const onSubjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value.split('::');
    setTopics(subjects[value[0]].topics);
  };

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

  const handleOnSubmit = (formData: FaqQuestionForm) => {
    dispatch(
      actionType === 'add'
        ? addFaqQuestion(formData, handleOnComplete)
        : editFaqQuestion(faqQuestion!, formData, handleOnComplete),
    );
  };

  return (
    <React.Fragment>
      <div className='grid bg-white box-shadow-light br-20'>
        {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
        {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='form-row'>
            <div className='col-4 form-group'>
              <label className='label'>
                For whom <span className='required'>*</span>{' '}
              </label>
              <select {...register('for')} className='form-control custom-select'>
                <option value='Employee'>Employee</option>
                <option value='Employer'>Employer</option>
              </select>
              {errors.for && <div className='text-danger error mt-1'>{errors.for?.message}</div>}
            </div>
            <div className='col-4 form-group'>
              <label className='label'>
                Subject <span className='required'>*</span>{' '}
              </label>
              <select
                {...register('subject')}
                className='form-control custom-select'
                onChange={onSubjectSelect}
              >
                <option value=''>Select Subject</option>
                {Object.values(subjects).map((subject, key) => (
                  <option key={key} value={`${subject.ID}::${subject.name}`}>
                    {subject.name}
                  </option>
                ))}
              </select>
              {errors.subject && (
                <div className='text-danger error mt-1'>{errors.subject?.message}</div>
              )}
            </div>
            <div className='col-4 form-group'>
              <label className='label'>
                Topic <span className='required'>*</span>
              </label>
              <select {...register('topic')} className='form-control custom-select'>
                <option value=''>Select Topic</option>
                {Object.values(topics).map((topic, key) => (
                  <option key={key} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
              {errors.topic && (
                <div className='text-danger error mt-1'>{errors.topic?.message}</div>
              )}
            </div>
            <div className='col-md-12 form-group'>
              <label className='label'>
                Question <span className='required'>*</span>
              </label>
              <input
                type='text'
                {...register('question')}
                className='form-control'
                placeholder=''
              />
              {errors.question && (
                <div className='text-danger error mt-1'>{errors.question?.message}</div>
              )}
            </div>
            <div className='col-md-12 form-group'>
              <label className='label'>
                Answer <span className='required'>*</span>
              </label>
              <Controller
                name='answer'
                control={control}
                render={({ field: { value, onChange } }) => {
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
                      <textarea disabled value={value} hidden />
                    </>
                  );
                }}
              />
              {errors.answer && (
                <div className='text-danger error mt-1'>{errors.answer?.message}</div>
              )}
            </div>
            <div className='col-md-12 form-group'>
              <label className='label'>
                Tags <span className='required'>*</span>
              </label>
              <div className='text-left'>
                <div className='input-custom-group'>
                  <Controller
                    name='tags'
                    control={control}
                    render={({ field: { onChange, name } }) => {
                      const handleChange = (value: OnChangeValue<OptionType, true>) => {
                        setTagValue([...value]);
                        onChange(value.map((v) => v.value));
                      };
                      const handleInputChange = (inputValue: string) => setInputValue(inputValue);
                      const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
                        if (!inputValue) return;
                        switch (event.key) {
                          case 'Tab':
                          case 'Enter':
                            setInputValue('');
                            onChange([...tagvalue.map((v) => v.value), inputValue]);
                            setTagValue([...tagvalue, createOption(inputValue)]);
                            event.preventDefault();
                        }
                      };
                      return (
                        <CreatableSelect
                          isMulti
                          name={name}
                          isClearable
                          value={tagvalue}
                          menuIsOpen={false}
                          inputValue={inputValue}
                          onChange={handleChange}
                          onKeyDown={handleKeyDown}
                          onInputChange={handleInputChange}
                          components={{ DropdownIndicator: null }}
                          placeholder='Type something and press enter or tab...'
                        />
                      );
                    }}
                  />
                </div>
              </div>
            </div>
            <div className='col-md-4 form-group'>
              <label className='label'>
                Status <span className='required'>*</span>{' '}
              </label>
              <select {...register('isActive')} className='form-control custom-select'>
                <option value='true'>Publish</option>
                <option value='false'>Draft</option>
              </select>
              {errors.isActive && (
                <div className='text-danger error mt-1'>{errors.isActive?.message}</div>
              )}
            </div>
            <div className='col-md-12'>
              <button
                type='submit'
                name='submit'
                id='submit'
                className='btn btn-primary custom-btn'
              >
                {status === 'loading' && <span className='spinner-border' role='status'></span>}
                {status !== 'loading' && <span>Save</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
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
    </React.Fragment>
  );
};

export default ManageQuestionAnswer;
