import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RootState } from 'app/store';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import TextEditor from 'components/TextEditor';
import {
  FooterContentSchema,
  FooterContentForm,
  addFooterContent,
  editFooterContent,
  getFooterContent,
} from './contentSlice';
import { isEmpty } from 'lodash';

const FooterContent = () => {
  const dispatch = useAppDispatch();
  const { type } = useParams<{ type: string }>();
  const [content, setContent] = useState<string>('');
  const [action, setAction] = useState<string>('get');
  const { footerContent, status, message } = useAppSelector(
    (state: RootState) => state.footerContent,
  );
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FooterContentForm>({
    resolver: yupResolver(FooterContentSchema),
  });

  const handleComplete = useCallback(() => {
    setAction('get');
  }, []);

  useEffect(() => {
    dispatch(getFooterContent(type, handleComplete));
  }, [dispatch, type, handleComplete]);

  useEffect(() => {
    if (!isEmpty(footerContent)) setContent(footerContent?.content as string);
    else setContent('');
  }, [dispatch, footerContent, type]);

  const handleOnSubmit = (formData: FooterContentForm) => {
    setAction('add/edit');
    isEmpty(footerContent)
      ? dispatch(addFooterContent(type, formData, handleComplete))
      : dispatch(editFooterContent(type, formData, handleComplete));
  };

  return (
    <React.Fragment>
      <div className='grid bg-white box-shadow-light br-20'>
        {status === 'failed' && <div className='alert alert-danger'>{message}</div>}
        {status === 'success' && <div className='alert alert-success'>Successfully Saved.</div>}
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <div className='form-row'>
            <div className='col-md-9 form-group'>
              <label className='label'>
                Enter or Paste your Page Content
                <span className='required'>*</span>
              </label>
              <TextEditor />
              {errors.content && (
                <div className='text-danger error mt-1'>{errors.content?.message}</div>
              )}
            </div>
            <div className='col-md-12'>
              <button
                type='submit'
                name='submit'
                id='submit'
                className='btn btn-primary custom-btn'
              >
                {status === 'loading' && action !== 'get' && (
                  <span className='spinner-border' role='status'></span>
                )}
                {status !== 'loading' && <span>Save</span>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default FooterContent;
